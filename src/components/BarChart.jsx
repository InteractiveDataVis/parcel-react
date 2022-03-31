import React, { useEffect, useRef } from "react";
import { scaleBand, scaleLinear, select } from "d3";

const height = 500, width = 300;

const BarChart = ({ data }) => {

  console.log(data)

  const svg = useRef(null)

  useEffect(() => {
    
    const xScale = scaleBand()
      .domain(data.map(d => d.name))
      .range([0, width])
      .padding(0.1)

    const yScale = scaleLinear()
      .domain([0, Math.max(...data.map(d => d.value))])
      .range([height, 0])

    const svgSelection = select(svg.current);

    const bars = svgSelection
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.name))
      .attr("y", d => yScale(d.value) )
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - yScale(d.value))

  }, [data])
  

  return <div className="barChart">
    <svg ref={svg} height={height} width={width}></svg>
  </div>
}

export default BarChart;