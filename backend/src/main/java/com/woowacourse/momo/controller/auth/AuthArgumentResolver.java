package com.woowacourse.momo.controller.auth;

import com.woowacourse.momo.exception.MomoException;
import com.woowacourse.momo.exception.code.AuthErrorCode;
import com.woowacourse.momo.service.auth.JwtManager;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
@RequiredArgsConstructor
public class AuthArgumentResolver implements HandlerMethodArgumentResolver {

    private static final String AUTHORIZATION = "Authorization";
    private static final String BEARER = "Bearer ";

    private final JwtManager jwtManager;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(AuthAttendee.class)
                && parameter.getParameterType().equals(long.class);
    }

    @Override
    public Long resolveArgument(
            @NonNull MethodParameter parameter,
            ModelAndViewContainer mavContainer,
            @NonNull NativeWebRequest webRequest,
            WebDataBinderFactory binderFactory
    ) {
        String token = getToken(webRequest);
        return jwtManager.extract(token);
    }

    private String getToken(NativeWebRequest webRequest) {
        String header = webRequest.getHeader(AUTHORIZATION);
        if (header == null) {
            throw new MomoException(AuthErrorCode.NOT_FOUND_TOKEN);
        }
        return header.replaceFirst(BEARER, "");
    }
}
