FROM oven/bun:alpine AS build

WORKDIR /app
COPY ./frontendnuxt .

RUN apk add nodejs
RUN bun install
RUN bun run build

FROM build AS production
WORKDIR /app

COPY --from=build /app/.output .

EXPOSE 3000
CMD ["bun", ".output/server/index.mjs"]