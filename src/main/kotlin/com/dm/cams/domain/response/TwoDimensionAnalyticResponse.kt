package com.dm.cams.domain.response

data class TwoDimensionAnalyticResponse<T>(
        val columns: Set<T>,
        val data: List<Long>
) {
    companion object {
        fun <T> of(data: Map<T, Long>): TwoDimensionAnalyticResponse<T> {
            return TwoDimensionAnalyticResponse(data.keys, data.values.toList());
        }
    }
}
