# Use lightweight JDK image
FROM eclipse-temurin:21-jdk-alpine

# Add curl
RUN apk --no-cache add curl

# Create working directory
WORKDIR /app

# Copy the JAR file
COPY target/service_hpp_analysis.jar app.jar

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
