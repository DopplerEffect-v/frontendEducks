import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

class usando_unittest(unittest.TestCase):

	def setUp(self):
		self.driver= webdriver.Chrome(executable_path=r"./chromedriver.exe")

	def test_Agregar_Usuario_Correctamente(self):
		driver= self.driver
		driver.get("http://54.162.5.155/")
		#driver.maximize_window()
		time.sleep(1)
		
		usuario=driver.find_element_by_name("email")
		password=driver.find_element_by_name("password")
		usuario.send_keys("renzo.bedrinana@pucp.edu.pe")
		password.send_keys("renzo123")
		password.send_keys(Keys.RETURN)
		time.sleep(3)
		#prueba
		comboBoxRoles=driver.find_element_by_id("comboBoxRoles")
		comboBoxRoles.click()
		time.sleep(1)

		administrador=driver.find_element_by_id("3")
		administrador.click()
		time.sleep(3)

		buttonNuevo=driver.find_element_by_id("buttonNuevo")
		buttonNuevo.click()
		time.sleep(1)

		inputNombres=driver.find_element_by_name("nombres")
		inputApellidoPaterno=driver.find_element_by_name("apellidoPaterno")
		inputMaterno=driver.find_element_by_name("apellidoMaterno")
		inputCodigo=driver.find_element_by_name("codigo")
		inputCorreo=driver.find_element_by_name("correoElectronico")
		inputNombres.send_keys("Peter")
		inputApellidoPaterno.send_keys("Johnson")
		inputMaterno.send_keys("McMiller")
		inputCodigo.send_keys("20190389")
		inputCorreo.send_keys("pjm@pucp.pe")
		
		buttonGuardar=driver.find_element_by_id("buttonGuardar")
		buttonGuardar.click()
		time.sleep(1)

		buttonAceptar=driver.find_element_by_id("buttonAceptar")
		buttonAceptar.click()
		time.sleep(3)

		inputBusqueda=driver.find_element_by_id("inputBusqueda")
		inputBusqueda.send_keys("20190389")

		###########################################################
		#Editar
		time.sleep(2)
		codigo = driver.find_element_by_id("codigo")
		assert codigo.text == "20190389"

		btnEditar=driver.find_element_by_id("btnEditar")
		btnEditar.click()
		time.sleep(4)

		#Editar Usuario
		titleEditar = driver.find_element_by_id("title")
		assert titleEditar.text == "Editar Usuario"

		#Inputs de usuario
		txtNombres  = driver.find_element_by_id("nombres")
		txtApellidoPaterno = driver.find_element_by_id("apellidoPaterno")
		txtApellidoMaterno = driver.find_element_by_id("apellidoMaterno")
		txtCodigo = driver.find_element_by_id("codigo")
		txtCorreo = driver.find_element_by_id("correoElectronico")
		#inputs
		txtNombres.send_keys(Keys.CONTROL + "a")
		txtNombres.send_keys(Keys.DELETE)
		txtNombres.send_keys("Mario")

		txtApellidoPaterno.send_keys(Keys.CONTROL + "a")
		txtApellidoPaterno.send_keys(Keys.DELETE)
		txtApellidoPaterno.send_keys("Perez")

		txtApellidoMaterno.send_keys(Keys.CONTROL + "a")
		txtApellidoMaterno.send_keys(Keys.DELETE)
		txtApellidoMaterno.send_keys("Perez")

		txtCodigo.send_keys(Keys.CONTROL + "a")
		txtCodigo.send_keys(Keys.DELETE)
		txtCodigo.send_keys("00024256")

		txtCorreo.send_keys(Keys.CONTROL + "a")
		txtCorreo.send_keys(Keys.DELETE)
		txtCorreo.send_keys("juan.perez@pucp.pe")


		buttonGuardar=driver.find_element_by_id("btnGuardar")
		buttonGuardar.click()
		time.sleep(1)

		buttonAceptar=driver.find_element_by_id("buttonAceptar")
		buttonAceptar.click()
		time.sleep(3)

		#Buscamos al usuario editado
		inputBusqueda=driver.find_element_by_id("inputBusqueda")
		inputBusqueda.send_keys("00024256")

		time.sleep(2)
		codigo = driver.find_element_by_id("codigo")
		assert codigo.text == "00024256"
		
	def test_CamposVacios_AgregarUsuario(self):
		log
		driver= self.driver
		driver.get("http://54.162.5.155/")
		driver.maximize_window()
		time.sleep(1)
		
		usuario=driver.find_element_by_name("email")
		password=driver.find_element_by_name("password")
		usuario.send_keys("renzo.bedrinana@pucp.edu.pe")
		password.send_keys("renzo123")
		password.send_keys(Keys.RETURN)
		time.sleep(3)
		prueba
		comboBoxRoles=driver.find_element_by_id("comboBoxRoles")
		comboBoxRoles.click()
		time.sleep(1)

		administrador=driver.find_element_by_id("3")
		administrador.click()
		time.sleep(3)
		gol
		buttonNuevo=driver.find_element_by_id("buttonNuevo")
		buttonNuevo.click()
		time.sleep(2)

		buttonGuardar=driver.find_element_by_id("buttonGuardar")
		buttonGuardar.click()
		time.sleep(1)

		buttonAceptar=driver.find_element_by_id("buttonAceptar")
		buttonAceptar.click()
		time.sleep(1)

		errorNombres=driver.find_element_by_id("ErrorNombres")
		print(errorNombres.text)
		assert "Por favor complete el nombre" == errorNombres.text

		ErrorApellidoPaterno=driver.find_element_by_id("ErrorApellidoPaterno")
		print(ErrorApellidoPaterno.text)
		assert "Por favor complete el apellido paterno" == ErrorApellidoPaterno.text
		
		ErrorApellidoMaterno=driver.find_element_by_id("ErrorApellidoMaterno")
		print(ErrorApellidoMaterno.text)
		assert "Por favor complete el apellido materno" == ErrorApellidoMaterno.text

		ErrorCodigo=driver.find_element_by_id("ErrorCodigo")
		print(ErrorCodigo.text)
		assert "Por favor complete el código" == ErrorCodigo.text

		ErrorCorreo=driver.find_element_by_id("ErrorCorreo")
		print(ErrorCorreo.text)
		assert "Por favor complete el correo" == ErrorCorreo.text

	def test_Agregar_Usuario_CamposErroneos(self):
		log
		driver= self.driver
		driver.get("http://54.162.5.155/")
		driver.maximize_window()
		time.sleep(1)
		
		usuario=driver.find_element_by_name("email")
		password=driver.find_element_by_name("password")
		usuario.send_keys("renzo.bedrinana@pucp.edu.pe")
		password.send_keys("renzo123")
		password.send_keys(Keys.RETURN)
		time.sleep(3)
		prueba
		comboBoxRoles=driver.find_element_by_id("comboBoxRoles")
		comboBoxRoles.click()
		time.sleep(1)

		administrador=driver.find_element_by_id("3")
		administrador.click()
		time.sleep(3)
		gol
		buttonNuevo=driver.find_element_by_id("buttonNuevo")
		buttonNuevo.click()
		time.sleep(1)

		inputNombres=driver.find_element_by_name("nombres")
		inputApellidoPaterno=driver.find_element_by_name("apellidoPaterno")
		inputMaterno=driver.find_element_by_name("apellidoMaterno")
		inputCodigo=driver.find_element_by_name("codigo")
		inputCorreo=driver.find_element_by_name("correoElectronico")
		
		inputNombres.send_keys("32wdew")
		inputApellidoPaterno.send_keys("Torr212es")
		inputMaterno.send_keys("Vas2121quez")
		inputCodigo.send_keys("iiiii222")
		inputCorreo.send_keys("juan.Torres")
		
		buttonGuardar=driver.find_element_by_id("buttonGuardar")
		buttonGuardar.click()
		time.sleep(1)

		buttonAceptar=driver.find_element_by_id("buttonAceptar")
		buttonAceptar.click()
		time.sleep(3)

		
		errorNombres=driver.find_element_by_id("ErrorNombres")
		print(errorNombres.text)
		assert "Ingrese solo letras, no números" == errorNombres.text

		ErrorApellidoPaterno=driver.find_element_by_id("ErrorApellidoPaterno")
		print(ErrorApellidoPaterno.text)
		assert "Ingrese solo letras, no números" == ErrorApellidoPaterno.text
		
		ErrorApellidoMaterno=driver.find_element_by_id("ErrorApellidoMaterno")
		print(ErrorApellidoMaterno.text)
		assert "Ingrese solo letras, no números" == ErrorApellidoMaterno.text

		ErrorCodigo=driver.find_element_by_id("ErrorCodigo")
		print(ErrorCodigo.text)
		assert "Ingrese solo números o letras mayúsculas" == ErrorCodigo.text

		ErrorCorreo=driver.find_element_by_id("ErrorCorreo")
		print(ErrorCorreo.text)
		assert "Por favor ingrese un correo válido" == ErrorCorreo.text
		
		inputCodigo.send_keys("123456789")
		time.sleep(2)
		
		ErrorCodigo=driver.find_element_by_id("ErrorCodigo")
		print(ErrorCodigo.text)
		assert "El código no puede superar los 8 caracteres." == ErrorCodigo.text
	
	
	def tearDown(self):
		self.driver.close()


if __name__ == '__main__':
	unittest.main()