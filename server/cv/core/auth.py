# Copyright (C) 2018 NSEIT Limited, Mumbai. All rights reserved.
#
# This program and the accompanying materials are made available
# under the terms described in the LICENSE file which accompanies
# this distribution. If the LICENSE file was not attached to this
# distribution or for further clarifications, please contact
# legal@nseit.com.

import logging

from pyramid.security import (
    NO_PERMISSION_REQUIRED,
    Authenticated,
    remember,
    forget,
)
from pyramid.csrf import new_csrf_token

from cornice import Service

from .models import User
from . import cors

log = logging.getLogger(__name__)

svc_login = Service(
    name="core.api.login", permission=NO_PERMISSION_REQUIRED,
    path="/ui/core/login", cors_policy=cors.POLICY)

svc_logout = Service(
    name="core.api.logout", permission=NO_PERMISSION_REQUIRED,
    path="/ui/core/logout", cors_policy=cors.POLICY)

svc_whoami = Service(
    name="core.api.whoami", permission=NO_PERMISSION_REQUIRED,
    path="/ui/core/whoami", cors_policy=cors.POLICY)


@svc_login.post(require_csrf=False)
def login(request):
    login = request.params['login']
    passwd = request.params['password']
    ret = None
    print(User)
    user = User.by_login(request.dbsession, login)
    if user and user.check_password(passwd):
        headers = remember(request, login)
        request.response.headerlist.extend(headers)
        # set the new csrf token in response
        new_csrf_token(request)
        request.session["login"] = login
        # request.session["user_type"] = user.user_type
        request.session["level"] = user.level
        request.session["user_id"] = user.id
        request.session["category"] = user.category
        request.session["token"] = new_csrf_token(request)
        ret = compute_whoami(request, login)
    else:
        headers = forget(request)
        request.response.headerlist.extend(headers)
        request.session.delete()
        ret = compute_whoami(request, None)

    return ret


@svc_logout.post(require_csrf=False)
def logout(request):
    headers = forget(request)
    request.response.headerlist.extend(headers)
    request.session.delete()
    return {
        "code": 1,
        "message": "success",
        "data": {}
    }


@svc_whoami.get()
def whoami(request):
    login = request.authenticated_userid
    return compute_whoami(request, login)


def compute_whoami(request, login):
    result = {
        'authenticated': False,
        'login': None,
        # 'user_type': 0,
    }

    if login is None:
        return result

    result['authenticated'] = True
    result['login'] = request.session['login']
    # result['user_type'] = request.session['user_type']
    result['level'] = request.session['level']
    result['user_id'] = request.session['user_id']
    result['token'] = request.session['token']
    result['category'] = request.session['category']
    return result

# Local Variables:
# mode: python
# End:
