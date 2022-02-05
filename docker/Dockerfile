FROM docker.io/library/node:14.18.0 as builder

# set working directory to target build folder
WORKDIR /usr/src/build

# copy project without all node_modules folder (ignored in .dockerignore)
COPY ../apps ./apps
COPY ../common ./common
COPY ../package.json yarn.lock .yarnrc.yml ./
COPY ../.yarn/releases ./.yarn/releases
COPY ../.yarn/plugins ./.yarn/plugins

# install production modules only
RUN yarn workspaces focus --production @apps/server

# base docker image (use minimal alpine image)
FROM docker.io/library/node:14.18.0-alpine

# define arguments with default values
ARG USER_ID=9999
ARG GROUP_ID=9999

# set NODE_ENV to production
ENV NODE_ENV=production

# fixme: healthcheck not working on nodejs startup error (eg. env validation errors)
# copy health check script and adjust permissions
COPY ../scripts/healthcheck.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/healthcheck.sh
HEALTHCHECK --interval=1m --timeout=30s CMD /usr/local/bin/healthcheck.sh

# install packages
RUN apk --no-cache add curl

# create user and group with ids from arguments (caution: BusyBox commands)
RUN addgroup -g ${GROUP_ID} runner
RUN adduser -g "" -D -H -G runner -u ${USER_ID} runner

# set working directory to target for copying artifacts
WORKDIR /usr/src

# todo: consider using yarn 2 zero install (copy folders .yarn/cache/, ...)
# copy node_module (production only)
COPY --chown=runner:runner --from=builder /usr/src/build/node_modules ./node_modules

# copy build artifact from apps
COPY --chown=runner:runner ../dist/apps ./apps
# copy build artifact from shared dependencies (common, libs, ...)
COPY --chown=runner:runner ../dist/common ./common

# recursively change owner for working directory
#RUN chown -R ${USER_ID}:${GROUP_ID} ./

# change working directory to apps
WORKDIR /usr/src/apps

# set user id and group id for user running inside container
USER ${USER_ID}:${GROUP_ID}

# run nodejs app
CMD node server/main
