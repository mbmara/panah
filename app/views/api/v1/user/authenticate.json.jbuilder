json.status true
json.name @user.fullname
json.admin @user.admin?
json.role @user.user_type.name
json.date @user.created_at
json.permission @user.user_type.id
json.shortname  @user.shortname
json.id @user.id
