package kr.momo.service.attendee.dto;

import jakarta.validation.constraints.NotEmpty;

public record AttendeeLoginRequest(@NotEmpty String name, @NotEmpty String password) {
}
