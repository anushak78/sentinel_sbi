# Copyright (C) 2018 NSEIT Limited, Mumbai. All rights reserved.
#
# This program and the accompanying materials are made available
# under the terms described in the LICENSE file which accompanies
# this distribution. If the LICENSE file was not attached to this
# distribution or for further clarifications, please contact
# legal@nseit.com.

import json

from pyramid.config import Configurator
from pyramid.authentication import SessionAuthenticationPolicy
from pyramid.authorization import ACLAuthorizationPolicy
from pyramid.csrf import CookieCSRFStoragePolicy
from cornice import handle_exceptions
from pyramid.httpexceptions import HTTPForbidden
from pyramid.security import NO_PERMISSION_REQUIRED

from .core import (
    create_dbsession_factory,
    create_dbengine,
    create_dbsession,
    get_root_factory,
    get_principals,
)

import logging

log = logging.getLogger(__name__)


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    # Tell cornice not to handle exceptions
    settings['handle_exceptions'] = False
    config = Configurator(settings=settings, root_factory=get_root_factory)
    # hook jinja templates
    config.include('pyramid_jinja2')
    config.add_jinja2_renderer('.html')

    # include beaker sesssion
    config.include('pyramid_beaker')

    # include cornice
    config.include('cornice')
    # Let cornice handle all exceptions apart from HTTPNotFound exception
    config.add_view(
        handle_exceptions, context=Exception,
        permission=NO_PERMISSION_REQUIRED)
    config.add_view(
        handle_exceptions, context=HTTPForbidden,
        permission=NO_PERMISSION_REQUIRED)

    # Store the CSRF token in cookie as the Angular HttpClient reads
    # from the cookie to set the appropriate headers. Configure the
    # pyramid to use the same token name and X- header used by the
    # Angular
    csrf_policy = CookieCSRFStoragePolicy(cookie_name='XSRF-TOKEN')
    config.set_csrf_storage_policy(csrf_policy)
    config.set_default_csrf_options(
        require_csrf=True, token='XSRF-TOKEN', header='X-XSRF-TOKEN')

    # Transaction manager and DB session setup
    settings['tm.manager_hook'] = 'pyramid_tm.explicit_manager'
    # use pyramid_tm to hook the transaction lifecycle to the request
    config.include('pyramid_tm')
    # use pyramid_retry to retry a request when transient exceptions occur
    config.include('pyramid_retry')
    dbsession_factory = create_dbsession_factory(create_dbengine(settings))
    config.registry['dbsession_factory'] = dbsession_factory
    # make request.dbsession available for use in Pyramid
    config.add_request_method(
        # r.tm is the transaction manager used by pyramid_tm
        lambda r: create_dbsession(dbsession_factory, r.tm),
        'dbsession',
        reify=True
    )

    # Setup authentication and authorisation
    authn_policy = SessionAuthenticationPolicy(callback=get_principals)
    authz_policy = ACLAuthorizationPolicy()
    config.set_authentication_policy(authn_policy)
    config.set_authorization_policy(authz_policy)
    config.set_default_permission("cv.view")

    config.include('cv.core')
    config.scan()
    return config.make_wsgi_app()


# Local Variables:
# mode: python
# End:
