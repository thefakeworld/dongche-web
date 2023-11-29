class SuccessResponse:
    def __init__(self, data, msg):
        self.code = 0
        self.data = data
        self.msg = msg

    def to_dict(self):
        return {"success": True, "msg": self.msg, "data": self.data, "code": self.code}

def create_success_response(data=None, msg='操作成功', status_code=200):
    return SuccessResponse(data, msg).to_dict(), status_code

# Usage example:
# user_json = {"_id": "123", "email": "example@example.com", "username": "example"}
# token = "abc123"

# success_response = create_success_response({"_id": user_json['_id'], "email": user_json['email'], "username": user_json['username'], "token": token})
