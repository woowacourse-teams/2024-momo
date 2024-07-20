package com.woowacourse.momo.exception.code;

import org.springframework.http.HttpStatus;

public interface ErrorCodeType {

    String message();

    HttpStatus httpStatus();
}
