package com.dm.cams.domain.response

data class TwoDimensionAnalyticResponse<T>(
        val columns: Set<T>,
        val data: List<Long>
) {
    companion object {
        fun <T : Comparable<T>> of(data: Map<T, Long>): TwoDimensionAnalyticResponse<T> {
            val sortedData = data.toSortedMap()
            return TwoDimensionAnalyticResponse(sortedData.keys, sortedData.values.toList());
        }
    }
}
