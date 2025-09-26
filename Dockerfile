# Stage 1: Builder - Installs dependencies and builds the application
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generate the Prisma client based on your schema
RUN npx prisma generate

# Disable Next.js telemetry during the build
ENV NEXT_TELEMETRY_DISABLED 1

# Build the Next.js application
RUN npm run build


# ---


# Stage 2: Runner - Creates the final, small production image
FROM node:20-alpine AS runner
WORKDIR /app

# Set the environment to production
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copy only the necessary files from the standalone output
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# The Prisma client is automatically included by the standalone output

EXPOSE 3000

# Healthcheck

HEALTHCHECK --interval=15s --timeout=5s --retries=3 --start-period=20s \
    CMD curl -fsS http://localhost:3000/api/health || exit 1

# The command to start the production server
CMD ["node", "server.js"]
