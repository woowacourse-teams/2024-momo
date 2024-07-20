package com.woowacourse.momo.exception;

import com.woowacourse.momo.exception.code.ErrorCodeType;
import lombok.Getter;

@Getter
public class MomoException extends RuntimeException {

    private final ErrorCodeType errorCodeType;

    public MomoException(ErrorCodeType errorCodeType) {
        super(errorCodeType.message());
        this.errorCodeType = errorCodeType;
    }
}
