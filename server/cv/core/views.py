# Copyright (C) 2018 NSEIT Limited, Mumbai. All rights reserved.
#
# This program and the accompanying materials are made available
# under the terms described in the LICENSE file which accompanies
# this distribution. If the LICENSE file was not attached to this
# distribution or for further clarifications, please contact
# legal@nseit.com.

import os

from pyramid.response import Response
from pyramid.view import view_config
from pyramid.renderers import render_to_response
from pyramid.security import (
    NO_PERMISSION_REQUIRED,
)
from pyramid.httpexceptions import HTTPFound


@view_config(route_name='home', permission=NO_PERMISSION_REQUIRED)
def home_view(request):
    return Response("Hola")


# Local Variables:
# mode: python
# End:
