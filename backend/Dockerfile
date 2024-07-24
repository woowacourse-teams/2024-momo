FROM --platform=linux/arm64 openjdk:17-ea-11

COPY build/libs/*.jar momo-api.jar
ENTRYPOINT ["java","-jar","/momo-api.jar", "--spring.config.location=file:/security/"]
