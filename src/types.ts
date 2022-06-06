import { Cast,Scale } from "./enums"

export interface ScaleConversionWithCastRequest {
    cast: Cast
    value: number
}

export interface ScaleConversionRequest {
    value: number
}

export interface ScaleConversionResponse {
    scale: Scale
    value: number
}