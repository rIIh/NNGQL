COMPOSE=docker-compose.traefik.yml
export REMOTE=${1:?"Provide remote"}
export REGISTRY=${2:-"registry.${REMOTE}"}/

echo Building images
docker-compose -f $COMPOSE build

echo Pushing images to host registry
docker-compose -f $COMPOSE push

echo Pull on remote?
docker-compose -f $COMPOSE -H "ssh://root@$REMOTE" pull

echo Starting container on remote "$REMOTE"
docker-compose -f $COMPOSE -H "ssh://root@$REMOTE" up -d --force-recreate --no-build
