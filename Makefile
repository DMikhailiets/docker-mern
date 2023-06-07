mongo:
	docker run 	-p 27017:27017 -d --rm --name mongodb --network notes-net mongo

backend: 
	docker run -p 8888:5000 -d  --name notes-backend  --network notes-net notes-backend

frontend: 
	docker run -p 7011:3000 -d  --name notes-frontend notes-frontend
