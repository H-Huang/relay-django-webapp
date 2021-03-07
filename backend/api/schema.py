from django.contrib.auth import get_user_model

import graphene
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from api.models import *

import graphql_jwt
from graphql import GraphQLError
from graphql_jwt.decorators import (login_required, user_passes_test)
from django.conf import settings


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


class Ship(graphene.ObjectType):
    '''A ship in the Star Wars saga'''
    class Meta:
        interfaces = (relay.Node, )

    name = graphene.String(description='The name of the ship.')

    @classmethod
    def get_node(cls, info, id):
        return get_ship(id)


class CategoryNode(DjangoObjectType):
    class Meta:
        model = Category
        filter_fields = ['name', 'ingredients']
        interfaces = (relay.Node, )


class IngredientNode(DjangoObjectType):
    class Meta:
        model = Ingredient
        # Allow for some more advanced filtering here
        filter_fields = {
            'name': ['exact', 'icontains', 'istartswith'],
            'notes': ['exact', 'icontains'],
            'category': ['exact'],
            'category__name': ['exact'],
        }
        interfaces = (relay.Node, )


class Query(graphene.ObjectType):
    '''
    Documentation for base query
    '''
    hello = graphene.String()
    category = relay.Node.Field(CategoryNode)
    all_categories = DjangoFilterConnectionField(CategoryNode)

    ingredient = relay.Node.Field(IngredientNode)
    all_ingredients = DjangoFilterConnectionField(IngredientNode)


class IntroduceShip(relay.ClientIDMutation):

    class Input:
        ship_name = graphene.String(required=True)
        faction_id = graphene.String(required=True)

    ship = graphene.Field(Ship)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        ship_name = input.ship_name
        faction_id = input.faction_id
        ship = create_ship(ship_name, faction_id)
        faction = get_faction(faction_id)
        return IntroduceShip(ship=ship, faction=faction)


class CreateUser(relay.ClientIDMutation):
    user = graphene.Field(UserType)

    class Input:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        print(input)
        user = get_user_model()(
            username=input["username"],
            email=input["email"],
        )
        user.set_password(input["password"])
        user.save()

        return CreateUser(user=user)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    token_auth = graphql_jwt.relay.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.relay.Verify.Field()
    refresh_token = graphql_jwt.relay.Refresh.Field()
    create_ship = IntroduceShip.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
