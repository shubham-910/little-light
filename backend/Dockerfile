FROM maven:3.8.5-openjdk-17 AS BUILD
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17
COPY --from=build /target/backend-0.0.1-SNAPSHOT.jar Little-Light-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "Little-Light-0.0.1-SNAPSHOT.jar"]
