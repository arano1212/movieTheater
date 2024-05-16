MOVIE THEATER

api para registrar ventas de  boletos de peliculas 

ENDPOINT



base = '/api/v1'


ENDPOINTS



REGISTER AND LOGIN

POST

'base/register' 

para registrar un usuario , recuerda especificar el rol del usuario  ya que colocara por default 'customer'


'base/login'


para loguear a un usuario  es necesario pasar el correo y  la contrasena, lo cual te arrojara el token





MOVIES

POST

CREATE

'base/movies'

para crear la  pelicula se debe pasar el json con los datos y estar  autenticado como 'admin'


GET

ALL MOVIES

'base/movies'

para obtener todas las peliculas se necesita estar autenticado sin importar tu role ['admin' , 'customer', 'employee']


ALL MOVIES QUERY

'base/movies/query'

para realizar un filtrado de busqueda de peliculas se pueden realizar por 'title', 'genre', 'rating' la forma de pasar
cualquiera es pasar la query de la siguiente manera:

'?title=(seguida del titulo de la pelicula sin los parentsis)'

'?genre=(seguida del genero de la pelicula sin los parentsis)'

'?rating=(seguida de la clasificado de la pelicula sin los parentsis)'

para hacer uso de este filtrado no es necesario estar autenticado.



MOVIE BY ID


'base/movies/:movieID'

pare buscar las peliculas por ID se debe estar autenticado sin importar el rol de usuario.


UPDATE MOVIE 

PATCH

'base/movies/:movieID'

para poder actualizar informacion o  cambiar sobre una pelicula se debe estar autenticado como 'admin'  y pasar el token
con el prefijo Bearer {token} mas el parameto en el json a cambiar.

DELETE

SOFT DELETE

'base/movies/:movieId'

para poder  realizar un logic delete debe estar autenticado como 'admin'  y pasar el token
con el prefijo Bearer {token}

HARD DELETE 

'base/movies/:movieID?destroy=true'

para poder  realizar un hard delete debe estar autenticado como 'admin'  y pasar el token
con el prefijo Bearer {token}


USERS 


para realizar cambios ,buscar infromacion y realizar borrados se deber estar autenticado como 'admin' y pasar el Bearer {token}, excepto  para ver 
el historial de tickets de un user 


GET

GET ALL USERS

'base/users'

para obtener todos lo susuarios 


GET USER BY ID 

'base/users/userId'

par aobtener un usuario por ID 


UPDATE 

PATCH

'base/users/:userId'

pasar el parametro a cambiar o actualizar en el json


DELETE

SOFT DELETE

'base/users/:userId'

para poder  realizar un logic delete debe estar autenticado como 'admin'  y pasar el token
con el prefijo Bearer {token}

HARD DELETE 

'base/users/:userId?destroy=true'

para poder  realizar un hard delete debe estar autenticado como 'admin'  y pasar el token
con el prefijo Bearer {token}


GET HISTORY TICKETS USER

para obtener el historial de tickets de un usuario solo se necesita estar autenticado sin importar el rol del user

'base/users/:userId/ticketsCustomers'


TICKETS

para realizar cambios ,buscar infromacion y realizar borrados se deber estar autenticado como 'admin' y pasar el Bearer {token}, excepto para crear tickets desde customers

POST

'base/tickets'

crear un tickets como admin

POST

'base/tickets/customers

cerar un ticket como customer se necesita estar logueado como customer y pasar el Barer {token}

GET

GET ALL TICKETS

'base/tickets'

obtener todos lso tickets 'admin'

GET TICKET BY ID 

'base/ticketS/:ticketsId'

obtener tickets por id  'admin'

TICKET BY ID (CUSTOMER)

'base/tickets/:tickerCustomerId'

obtenr los ticketsCustomer por id 'adminm , 'employee', 'customer'




para eliminar actualizar  los tickets customer se debe estar logueado como 'admin'

UPDATE

PATCH

'base/tickets/customers/:ticketCustomerId'

para actualizar un ticket  se debe pasar el Bearer {token}


DELETE

SOFT DELETE

'base/tickets/customers/:ticketCustomerId'

para poder  realizar un logic delete debe estar autenticado como 'admin'  y pasar el token
con el prefijo Bearer {token}

HARD DELETE 

'base/tickets/customers/:ticketCustomerId?destroy=true'

para poder  realizar un hard delete debe estar autenticado como 'admin'  y pasar el token
con el prefijo Bearer {token}


GET HISTORY TICKETS USER

GET

para obtener el historial de tickets de un usuario solo se necesita estar autenticado sin importar el rol del user

'base/users/:userId/ticketsCustomers'



















