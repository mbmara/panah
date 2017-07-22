# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
UserType.create([
	{name: "User"},
	{name: "Encoder"},
	{name: "Editor"},
	{name: "Admin"}
])
User.create({
	fname: 'Cabugos',
	lname: 'Ramel',
	mname: 'Pakig',
	email: "tearhear18@gmail.com",
	password: '4297F44B13955235245',
	user_type_id: 4,
	office_id: 1
})