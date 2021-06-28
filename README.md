# Frontend carro compras desafío wallmart

Proyecto creado con  [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

## Entorno de desarrollo
Antes de correr la aplicación, es importante utilizar el comando  ```nmp install``` para reconstruir módulos de Node en caso de necesitar ejecutar clonando el código fuente

## Puerto predefinido para ejecución:  
```` http://localhost:4200 ````
## Consideraciones para lectura y ejecución del API Backend: 

Es importante considerar cuando se defina el puerto donde correrá el backend de la imagen de Docker, que éste está leyendo el API backend en ```` http://localhost:8080 ```` .
Puede cambiar esta ruta en el código fuente en la configuración de las variables de entorno en ```src/enviroments/enviroments.prod.ts``` y en ```src/enviroments/enviroments.ts``` ambas en la linea ```1``` en caso de querer correrlo en un lugar distinto al localhost

## Imagen Docker
La imagen Docker del proyecto, se encuentra en el drive  [Imagen Docker Frontend](https://drive.google.com/drive/folders/1OP25KZ6CAf9W3YeOkAK6ePR36TahrLFr?usp=sharing)  el archivo es:  ```` frontend-wallmart.tar ````
 
