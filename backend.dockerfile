FROM oven/bun:alpine AS build

WORKDIR /app
COPY ./backend .

RUN apk add nodejs
RUN bun install
RUN bun run build

FROM build AS production
WORKDIR /app

COPY --from=build /app/.output .

EXPOSE 3300
CMD ["./.output/server"]