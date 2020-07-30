# Copyright (C) 2018 NSEIT Limited, Mumbai. All rights reserved.
#
# This program and the accompanying materials are made available
# under the terms described in the LICENSE file which accompanies
# this distribution. If the LICENSE file was not attached to this
# distribution or for further clarifications, please contact
# legal@nseit.com.

import os
import sys
import transaction
import json
from pyramid.paster import (
    get_appsettings,
    setup_logging,
)
from collections import OrderedDict
from pyramid.scripts.common import parse_vars

from ..core import (
    create_dbengine,
    create_dbsession_factory,
    create_dbsession,
)
from ..core.meta import Base
from ..core.models import (
    User,
    UserType,
)

from ..biz import models


def usage(argv):
    cmd = os.path.basename(argv[0])
    print('usage: %s <config_uri> [var=value]\n'
          '(example: "%s development.ini")' % (cmd, cmd))
    sys.exit(1)


def main(argv=sys.argv):
    if len(argv) < 2:
        usage(argv)
    config_uri = argv[1]
    options = parse_vars(argv[2:])
    setup_logging(config_uri)
    settings = get_appsettings(config_uri, options=options)

    engine = create_dbengine(settings)

    Base.metadata.drop_all(engine)
    create_all_tables(engine)

    session_factory = create_dbsession_factory(engine)

    with transaction.manager:
        dbsession = create_dbsession(session_factory, transaction.manager)
        create_users(dbsession)
        # _add_general(dbsession)
        add_masters(dbsession)


def create_all_tables(engine):
    Base.metadata.create_all(engine)


# def create_users(DBSession):
#     l1_user = User('l1user', 1)
#     l1_user.set_password('l1user')
#     l1_user.user_type = UserType.LEVEL1.value
#
#     l2_user = User('l2user', 2)
#     l2_user.set_password('l2user')
#     l2_user.user_type = UserType.LEVEL2.value
#
#     l3_user = User('l3user', 3)
#     l3_user.set_password('l3user')
#     l3_user.user_type = UserType.LEVEL3.value
#
#     DBSession.add(l1_user)
#     DBSession.add(l2_user)
#     DBSession.add(l3_user)


def create_users(DBSession):
    type = [
        {
            "type": "gen",
            "key": 0,
            "count": 20
        }, {
            "type": "service",
            "key": 1,
            "count": 5
        }, {
            "type": "dept",
            "key": 2,
            "count": 5
        }, {
            "type": "dw",
            "key": 3,
            "count": 5
        }
    ]
    for level in range(3):
        print(level)
        for t in type:
            for count in range(t['count']):
                username = t['type'] + str(level + 1) + "user" + str(count + 1)
                user = User(username, level + 1, t['key'])
                user.set_password('abcd1234')
                DBSession.add(user)


def add_masters(DBSession):
    data = {}
    master = os.path.abspath(
        os.path.join(__file__, "../../../../client/assets/question.json"))
    with open(master) as f:
        data = json.load(f, object_pairs_hook=OrderedDict)
    for doc, doc_data in data.items():
        doc_query = models.DocumentTypes(doc, doc_data[0]['doc_id'])
        DBSession.add(doc_query)
        add_question(DBSession, doc_data[0]['doc_id'], doc_data)


def add_question(DBSession, doc_id, data):
    print(data)
    for qn_id, question in enumerate(data):
        quest_query = models.QuestionTypes(question['question'], qn_id + 1,
                                           doc_id)
        DBSession.add(quest_query)
        add_answers(DBSession, doc_id, qn_id + 1, question)


def add_answers(DBSession, doc_id, qn_id, data):
    for ans_id, answer in enumerate(data['options']):
        ans_query = models.AnswerTypes(data['options'][answer],
                                       ans_id + 1, qn_id,
                                       doc_id)
        DBSession.add(ans_query)

# Local Variables:
# mode: python
# End:
