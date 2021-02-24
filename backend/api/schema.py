import graphene
from graphene_django import DjangoObjectType

from api.models import *

import graphql_jwt
from graphql import GraphQLError
from graphql_jwt.decorators import (login_required, user_passes_test)
from django.conf import settings


class Query(graphene.ObjectType):
    '''
    Documentation for base query
    '''
    hello = graphene.String()


class Mutation(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
