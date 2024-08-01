FROM --platform=linux/arm64 openjdk:17-ea-11

ARG SECURITY_VOLUME=/momo/security
ENV SECURITY_PATH=$SECURITY_VOLUME

COPY build/libs/*.jar /momo/momo-api.jar
ENTRYPOINT [ "java", "-jar", "/momo/momo-api.jar", \
    "--spring.profiles.active=dev" ]

EXPOSE 8080
