json.extract! @profile, :id,:created_at, :email, :fname, :lname, :mname 
json.name @profile.fullname
json.type @profile.user_type.name
json.user_type  @profile.user_type.id
json.total_docs @profile.post.count
json.rejected @profile.post.rejected.count
json.user_types UserType.all