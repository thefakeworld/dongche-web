
from flask_restx import Namespace, Resource

from .routes import rest_api

"""
    Flask-Restx routes
"""


# @rest_api.route('/api/cars/search')
# class CarsSearch(Resource):
#     def get(self):
#         print("搜索")

#         return {"success": True,
#                 "msg": "搜索"}, 200