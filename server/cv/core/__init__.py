# Copyright (C) 2018 NSEIT Limited, Mumbai. All rights reserved.
#
# This program and the accompanying materials are made available
# under the terms described in the LICENSE file which accompanies
# this distribution. If the LICENSE file was not attached to this
# distribution or for further clarifications, please contact
# legal@nseit.com.

import logging
import pprint

from pyramid.security import (
    Allow,
    Authenticated,
    ALL_PERMISSIONS
)
from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import configure_mappers
import zope.sqlalchemy

from .meta import Base # flake8: noqa

# run configure_mappers after defining all of the models to ensure
# all relationships can be setup
configure_mappers()

log = logging.getLogger(__name__)


def create_dbengine(settings, prefix='sqlalchemy.'):
    return engine_from_config(settings, prefix)


def create_dbsession_factory(dbengine):
    factory = sessionmaker()
    factory.configure(bind=dbengine)
    return factory


def create_dbsession(dbsession_factory, transaction_manager):
    """
    Get a ``sqlalchemy.orm.Session`` instance backed by a transaction.

    This function will hook the session to the transaction manager which
    will take care of committing any changes.

    - When using pyramid_tm it will automatically be committed or aborted
      depending on whether an exception is raised.

    - When using scripts you should wrap the session in a manager yourself.
      For example::

          import transaction

          engine = create_dbengine(settings)
          session_factory = create_dbsession_factory(engine)
          with transaction.manager:
              dbsession = create_dbsession(session_factory, transaction.manager)

    """
    dbsession = dbsession_factory()
    zope.sqlalchemy.register(
        dbsession, transaction_manager=transaction_manager)
    return dbsession


class Root(object):
    __name__ = ''
    __parent__ = None
    __acl__ = [
        (Allow, Authenticated, ALL_PERMISSIONS),
    ]


def get_root_factory(request):
    root = Root()
    return root


def get_principals(login, request):
    principals = [login, ]
    return principals


def includeme(config):
    config.add_route('home', '/')
    config.add_route('docs.view', '/docs/{candidate_id}/{file_name}')
    config.add_route('docs.report', '/uploads/{file_name}')

# Local Variables:
# mode: python
# End:
