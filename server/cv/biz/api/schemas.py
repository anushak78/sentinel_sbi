# Copyright (C) 2018 NSEIT Limited, Mumbai. All rights reserved.
#
# This program and the accompanying materials are made available
# under the terms described in the LICENSE file which accompanies
# this distribution. If the LICENSE file was not attached to this
# distribution or for further clarifications, please contact
# legal@nseit.com.

import colander

# Step1
class PgCalc_50mNabove_Upto1891991(colander.MappingSchema):
    dt_pg_por = colander.SchemaNode(colander.DateTime())
    str_caste = colander.SchemaNode(colander.String())
    float_pgMarks = colander.SchemaNode(colander.Float())
    bool_diffAbled = colander.SchemaNode(colander.Boolean())
    str_subjHandledStatus = colander.SchemaNode(colander.Integer())
    v_subjHandled = colander.SchemaNode(colander.String())
    v_subjApplied = colander.SchemaNode(colander.String())
    dt_elp_fromDt = colander.SchemaNode(colander.DateTime())
    dt_elp_toDt = colander.SchemaNode(colander.DateTime())


# Step 2
class PgCalc_55MarksforOCnGT_19091991_17072018(colander.MappingSchema):
    dt_pg_por = colander.SchemaNode(colander.DateTime())
    str_caste = colander.SchemaNode(colander.String())
    float_pgMarks = colander.SchemaNode(colander.Integer())
    bool_diffAbled = colander.SchemaNode(colander.Boolean())
    str_subjHandledStatus = colander.SchemaNode(colander.Integer())
    v_subjHandled = colander.SchemaNode(colander.String())
    v_subjApplied = colander.SchemaNode(colander.String())
    SLET_STATUS = colander.SchemaNode(colander.Boolean())
    NET_STATUS = colander.SchemaNode(colander.Boolean())
    v_subjNet = colander.SchemaNode(colander.String())
    v_subjSlet = colander.SchemaNode(colander.String())
    dt_elp_fromDt = colander.SchemaNode(colander.DateTime())
    dt_elp_toDt = colander.SchemaNode(colander.DateTime())
    dt_slet_por = colander.SchemaNode(colander.DateTime())
    dt_net_por = colander.SchemaNode(colander.DateTime())

# Step 3
class PgCalc_55MarksforNonOC_18072018_04102019(colander.MappingSchema):
    dt_pg_por = colander.SchemaNode(colander.DateTime())
    str_caste = colander.SchemaNode(colander.String())
    int_pgMarks = colander.SchemaNode(colander.Integer())
    bool_diffAbled = colander.SchemaNode(colander.Boolean())
    str_subjHandledStatus = colander.SchemaNode(colander.Integer())
    v_subjHandled = colander.SchemaNode(colander.String())
    v_subjApplied = colander.SchemaNode(colander.String())
    SLET_STATUS = colander.SchemaNode(colander.Boolean())
    NET_STATUS = colander.SchemaNode(colander.Boolean())
    v_subjNet = colander.SchemaNode(colander.String())
    v_subjSlet = colander.SchemaNode(colander.String())
    dt_elp_fromDt = colander.SchemaNode(colander.DateTime())
    dt_elp_toDt = colander.SchemaNode(colander.DateTime())
    bool_equivFlag1 = colander.SchemaNode(colander.Boolean())
    bool_equivFlag2 = colander.SchemaNode(colander.Boolean())
    dt_slet_por = colander.SchemaNode(colander.DateTime())
    dt_net_por = colander.SchemaNode(colander.DateTime())


# Step 4
class PhdCalc_submtdbfr_31122002(colander.MappingSchema):
    dt_pg_por = colander.SchemaNode(colander.DateTime())
    str_caste = colander.SchemaNode(colander.String())
    int_pgMarks = colander.SchemaNode(colander.Integer())
    bool_diffAbled = colander.SchemaNode(colander.Boolean())
    str_subjHandledStatus = colander.SchemaNode(colander.Integer())
    v_subjHandled = colander.SchemaNode(colander.String())
    v_subjApplied = colander.SchemaNode(colander.String())
    SLET_STATUS = colander.SchemaNode(colander.Boolean())
    NET_STATUS = colander.SchemaNode(colander.Boolean())
    v_subjNet = colander.SchemaNode(colander.String())
    v_subjSlet = colander.SchemaNode(colander.String())
    dt_elp_fromDt = colander.SchemaNode(colander.DateTime())
    dt_elp_toDt = colander.SchemaNode(colander.DateTime())
    bool_equivFlag1 = colander.SchemaNode(colander.Boolean())
    bool_equivFlag2 = colander.SchemaNode(colander.Boolean())
    dt_phd_por = colander.SchemaNode(colander.DateTime())
    dt_slet_por = colander.SchemaNode(colander.DateTime())
    dt_net_por = colander.SchemaNode(colander.DateTime())


# Step 5
class Calc_mphil_bfr31121993_phd_bfr31121993(colander.MappingSchema):
    dt_pg_por = colander.SchemaNode(colander.DateTime())
    str_caste = colander.SchemaNode(colander.String())
    int_pgMarks = colander.SchemaNode(colander.Integer())
    bool_diffAbled = colander.SchemaNode(colander.Boolean())
    str_subjHandledStatus = colander.SchemaNode(colander.Integer())
    v_subjHandled = colander.SchemaNode(colander.String())
    v_subjApplied = colander.SchemaNode(colander.String())
    dt_elp_fromDt = colander.SchemaNode(colander.DateTime())
    dt_elp_toDt = colander.SchemaNode(colander.DateTime())
    bool_equivFlag1 = colander.SchemaNode(colander.Boolean())
    bool_equivFlag2 = colander.SchemaNode(colander.Boolean())
    dt_phd_por = colander.SchemaNode(colander.DateTime())
    bool_chk_1 = colander.SchemaNode(colander.Boolean())
    bool_chk2 = colander.SchemaNode(colander.Boolean())
    v_equiv1Sub = colander.SchemaNode(colander.String())
    v_equiv2Sub = colander.SchemaNode(colander.String())
    dt_mhil_por = colander.SchemaNode(colander.DateTime())
    dt_phd_por = colander.SchemaNode(colander.DateTime())
    dt_net_por = colander.SchemaNode(colander.DateTime())
    dt_slet_por = colander.SchemaNode(colander.DateTime())
    str_sletNnetStatus = colander.SchemaNode(colander.Boolean())
    v_subjNet = colander.SchemaNode(colander.String())
    v_subjSlet = colander.SchemaNode(colander.String())


# Step 6
class Pg_phdCalc_CS_DE_OU_submtdbfr_02042009(colander.MappingSchema):
    dt_pg_por = colander.SchemaNode(colander.DateTime())
    str_caste = colander.SchemaNode(colander.String())
    int_pgMarks = colander.SchemaNode(colander.Integer())
    bool_diffAbled = colander.SchemaNode(colander.Boolean())
    str_subjHandledStatus = colander.SchemaNode(colander.Integer())
    v_subjHandled = colander.SchemaNode(colander.String())
    v_subjApplied = colander.SchemaNode(colander.String())
    dt_elp_fromDt = colander.SchemaNode(colander.DateTime())
    dt_elp_toDt = colander.SchemaNode(colander.DateTime())
    bool_equivFlag1 = colander.SchemaNode(colander.Boolean())
    dt_phd_por = colander.SchemaNode(colander.DateTime())
    bool_chk_1 = colander.SchemaNode(colander.Boolean())
    v_equiv1Sub = colander.SchemaNode(colander.String())


# Step 7
class Calc_pgNmphil_bfr14062006_aftr29062010(colander.MappingSchema):
    dt_pg_por = colander.SchemaNode(colander.DateTime())
    str_caste = colander.SchemaNode(colander.String())
    int_pgMarks = colander.SchemaNode(colander.Integer())
    bool_diffAbled = colander.SchemaNode(colander.Boolean())
    str_subjHandledStatus = colander.SchemaNode(colander.Integer())
    v_subjHandled = colander.SchemaNode(colander.String())
    v_subjApplied = colander.SchemaNode(colander.String())
    dt_elp_fromDt = colander.SchemaNode(colander.DateTime())
    dt_elp_toDt = colander.SchemaNode(colander.DateTime())
    bool_equivFlag1 = colander.SchemaNode(colander.Boolean())
    dt_phd_por = colander.SchemaNode(colander.DateTime())
    bool_chk_1 = colander.SchemaNode(colander.Boolean())
    v_equiv1Sub = colander.SchemaNode(colander.String())
    dt_mhil_por = colander.SchemaNode(colander.DateTime())
    dt_phd_por = colander.SchemaNode(colander.DateTime())
    dt_net_por = colander.SchemaNode(colander.DateTime())
    dt_slet_por = colander.SchemaNode(colander.DateTime())
    str_sletNnetStatus = colander.SchemaNode(colander.Boolean())
    v_subjNet = colander.SchemaNode(colander.String())
    v_subjSlet = colander.SchemaNode(colander.String())
    bool_equivFlag2 = colander.SchemaNode(colander.Boolean())
    v_equiv1Sub = colander.SchemaNode(colander.String())
    v_equiv2Sub = colander.SchemaNode(colander.String())
    bool_chk2 = colander.SchemaNode(colander.Boolean())


# Step 8
class Calc_pgNmphil_CROUDE_bfr14062006_aftr29062010(colander.MappingSchema):
    dt_pg_por = colander.SchemaNode(colander.DateTime())
    str_caste = colander.SchemaNode(colander.String())
    int_pgMarks = colander.SchemaNode(colander.Integer())
    bool_diffAbled = colander.SchemaNode(colander.Boolean())
    str_subjHandledStatus = colander.SchemaNode(colander.Integer())
    v_subjHandled = colander.SchemaNode(colander.String())
    v_subjApplied = colander.SchemaNode(colander.String())
    dt_elp_fromDt = colander.SchemaNode(colander.DateTime())
    dt_elp_toDt = colander.SchemaNode(colander.DateTime())
    bool_equivFlag1 = colander.SchemaNode(colander.Boolean())
    dt_phd_por = colander.SchemaNode(colander.DateTime())
    bool_chk_1 = colander.SchemaNode(colander.Boolean())
    v_equiv1Sub = colander.SchemaNode(colander.String())
    dt_mhil_por = colander.SchemaNode(colander.DateTime())
    dt_phd_por = colander.SchemaNode(colander.DateTime())
    dt_net_por = colander.SchemaNode(colander.DateTime())
    dt_slet_por = colander.SchemaNode(colander.DateTime())
    str_sletNnetStatus = colander.SchemaNode(colander.Boolean())
    v_subjNet = colander.SchemaNode(colander.String())
    v_subjSlet = colander.SchemaNode(colander.String())
    bool_equivFlag2 = colander.SchemaNode(colander.Boolean())
    v_equiv1Sub = colander.SchemaNode(colander.String())
    v_equiv2Sub = colander.SchemaNode(colander.String())
    bool_chk2 = colander.SchemaNode(colander.Boolean())


# Step 9
class Pg_phdCalc_CS_DE_OU_submtdbfr_04102019(colander.MappingSchema):
    dt_pg_por = colander.SchemaNode(colander.DateTime())
    str_caste = colander.SchemaNode(colander.String())
    int_pgMarks = colander.SchemaNode(colander.Integer())
    bool_diffAbled = colander.SchemaNode(colander.Boolean())
    str_subjHandledStatus = colander.SchemaNode(colander.Integer())
    v_subjHandled = colander.SchemaNode(colander.String())
    v_subjApplied = colander.SchemaNode(colander.String())
    dt_elp_fromDt = colander.SchemaNode(colander.DateTime())
    dt_elp_toDt = colander.SchemaNode(colander.DateTime())
    bool_equivFlag1 = colander.SchemaNode(colander.Boolean())
    dt_phd_por = colander.SchemaNode(colander.DateTime())
    bool_chk_1 = colander.SchemaNode(colander.Boolean())
    v_equiv1Sub = colander.SchemaNode(colander.String())

# Local Variables:
# mode: python
# End:
