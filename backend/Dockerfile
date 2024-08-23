FROM --platform=linux/arm64 openjdk:17-ea-11

ARG SECURITY_VOLUME=/momo/security
ENV SECURITY_PATH=$SECURITY_VOLUME
ENV SPRING_PROFILE=local

COPY build/libs/*.jar /momo/momo-api.jar
ENTRYPOINT ["java", "-jar", "/momo/momo-api.jar"]
CMD ["--spring.profiles.active=${SPRING_PROFILE}"]

EXPOSE 8080
