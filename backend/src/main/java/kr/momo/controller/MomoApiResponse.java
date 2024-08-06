package kr.momo.controller;

import io.swagger.v3.oas.annotations.media.Schema;

public record MomoApiResponse<T>(@Schema(description = "응답 데이터") T data) {
}
