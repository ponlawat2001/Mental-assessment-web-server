export const chartConfigBar = (
  Yline?: number[] | any,
  Xline?: string[] | any
) => ({
  type: "bar",
  height: 240,
  series: [
    {
      name: "จำนวนกาาทำแบบประเมิน",
      data: Yline ? Yline : [],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#9dc08b"],
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#40513b",
          fontSize: "14px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: Xline ? Xline : [],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#40513b",
          fontSize: "14px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        right: 20,
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: "dark",
    },
  },
});

export const chartConfigLine = (
  Yline?: number[] | any,
  Xline?: string[] | any
) => ({
  type: "line",
  height: 240,
  series: [
    {
      name: "จำนวนการระบายความในใจ",
      data: Yline ? Yline : [],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#9dc08b"],
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#40513b",
          fontSize: "14px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: Xline ? Xline : [],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#40513b",
          fontSize: "14px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        right: 20,
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: "dark",
    },
  },
});

export const chartConfigPie = (
  Yline?: number[] | any,
  Xline?: string[] | any
) => ({
  type: "pie",
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
  series: Yline ? Yline : [],

  options: {
    labels: Xline ? Xline : [],

    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
  },
});
