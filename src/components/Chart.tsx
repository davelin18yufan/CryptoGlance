import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from "recharts"
import { formatNumber } from "../utils"
import { useColorMode } from "@chakra-ui/react"

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#0052FE",
  "#00B38F",
  "#EFA100",
  "#FF6022",
  "#00A5FE",
  "#00D4BF",
] as const

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  value,
  payload,
  labelType,
  fill
}: // index,
any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  let displayValue
  if (labelType === "percentage") {
    displayValue = `${(percent * 100).toFixed(0)}%`
  } else if (labelType === "value") {
    displayValue = `$${formatNumber(value)}`
  } else {
    displayValue = payload.symbol
  }

  return (
    <text
      x={x}
      y={y}
      fill={fill}
      // stroke={COLORS[index]}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {displayValue}
    </text>
  )
}

const Chart = ({
  assets,
  labelType,
}: {
  assets: {
    symbol: string
    icon: string
    address: string
    balance: number
    usdValue: number
    percentage: number
  }[]
  labelType: "value" | "percentage" | "symbol"
}) => {
  const data = assets.filter((a) => a.balance !== 0)
  const {colorMode} = useColorMode()
  const fill = colorMode === 'light' ? 'black' : 'white'

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      style={{ position: "relative" }}
    >
      <PieChart width={500} height={500}>
        <Legend verticalAlign="bottom" />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={(props) => renderCustomizedLabel({ ...props, labelType, fill })}
          outerRadius={80}
          fill="#8884d8"
          dataKey="usdValue"
          nameKey="symbol"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default Chart
