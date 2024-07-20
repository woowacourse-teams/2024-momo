package com.woowacourse.momo.exception.code;

import org.springframework.http.HttpStatus;

public interface ErrorCodeType {

    HttpStatus httpStatus();

    String message();

    String errorCode();
}
