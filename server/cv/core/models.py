# Copyright (C) 2018 NSEIT Limited, Mumbai. All rights reserved.
#
# This program and the accompanying materials are made available
# under the terms described in the LICENSE file which accompanies
# this distribution. If the LICENSE file was not attached to this
# distribution or for further clarifications, please contact
# legal@nseit.com.

import logging
import random
import hashlib
import six
import enum

from pyramid.security import Allow

from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey,
    Table,
)
from sqlalchemy.orm import relationship, backref

from .meta import Base

log = logging.getLogger(__name__)


@enum.unique
class UserType(enum.Enum):
    LEVEL1 = 1
    LEVEL2 = 2
    LEVEL3 = 3


class User(Base):
    __tablename__ = 'cv_users'
    __table_args__ = {"schema": "cv"}

    id = Column(Integer, primary_key=True)
    login = Column(String(15), nullable=False, unique=True)
    password = Column(String(256), nullable=False)
    # user_type = Column(Integer, nullable=True)
    level = Column(Integer, nullable=False)
    category = Column(Integer, nullable=False)

    def __init__(self, login, level, category):
        self.login = login
        self.level = level
        password = _generate_temp_password(8)
        self.password = _sha512(password)
        self.category = category

    def set_password(self, password):
        self.password = _sha512(password)

    def check_password(self, password):
        return self.password == _sha512(password)

    @classmethod
    def by_login(cls, DBSession, login):
        return DBSession.query(User).filter_by(login=login).first()

    def to_dict(self):
        return {
            'id': self.id,
            'login': self.login,
            # 'type': UserType(self.user_type).name
        }


def _sha512(text):
    sha = hashlib.sha512()
    sha.update(six.b(text))
    return sha.hexdigest()


def _generate_temp_password(length):
    chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    r = random.SystemRandom()
    return ''.join(r.choice(chars) for _ in range(length))

# Local Variables:
# mode: python
# End:
