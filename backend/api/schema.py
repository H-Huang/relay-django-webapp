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
        filter_fields = ['username']
        interfaces = (relay.Node, )


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
    all_users = DjangoFilterConnectionField(UserType)


class GetUser(relay.ClientIDMutation):
    user = graphene.Field(UserType)

    class Input:
        password = graphene.String(required=True)
        username = graphene.String(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        User = get_user_model()
        user = User.objects.get(username=input["username"])

        return SignIn(user=user)


class CreateUser(relay.ClientIDMutation):
    user = graphene.Field(UserType)

    class Input:
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        print(input)
        user = get_user_model()(
            username=input["email"],
            email=input["email"],
        )
        user.set_password(input["password"])
        user.save()

        return CreateUser(user=user)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    token_auth = graphql_jwt.relay.ObtainJSONWebToken.Field()
    # sign_in = SignIn.Field()
    verify_token = graphql_jwt.relay.Verify.Field()
    refresh_token = graphql_jwt.relay.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
