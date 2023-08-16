mongo:
	docker run 	\
	-p 27017:27017 \
	-d \
	--rm \
	--name mongodb \
	--network notes-net \
	-v mongo-data:/data/db \
	--env-file ./config/development.env \
	mongo

# -e можно херачить переменные окружения прям сюда 

backend: 
	docker run \
	-p 8888:5000 \
	-d  \
	-rm \
	--name notes-backend  \
	--network notes-net \
	-v /Users/d_mikhalets/Education/Docker/docker-mern/server:/app \
	-v /app/node_modules \
	--env-file ./config/development.env \
	notes-backend

#-v /Users/d_mikhalets/Education/Docker/docker-mern/server:/app - для подгрузки изменяемых файлов
#-v /app/node_modules 

frontend: 
	docker run \
	-p 7011:3000 \
	-d  \
	--name notes-frontend \
	-v /Users/d_mikhalets/Education/Docker/docker-mern/client/src:/app/src \
	notes-frontend

stop: 
	docker stop mongodb notes-frontend notes-backend

dev:
	docker-compose -f docker-compose.yml up -d
