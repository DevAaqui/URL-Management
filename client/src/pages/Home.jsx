import React, { Fragment, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Stack } from '@mui/material';
import Header from '../components/Header';
// import { makeStyles } from '@mui/styles';
import '../assets/HomePageCSS/HomePage.css'
import GaugeMeter from '../components/GaugeMeter';
import MachineWiseOEE from '../components/MachineWiseOEE';
import { downTimeProps, machineOEEData, yTicks } from '../constants/data';
import DownTimeReport from '../components/DownTimeReport';
import ChartRendering from '../components/testchartreactchart';
import DownTimeReport2 from '../components/DownTimeReport2';
import StackedBarChartComponent from '../components/StackBarChart';
import { data } from '../constants/stackedchartdata';
import UDownTimeChart from '../components/utilizatnDTChart';
import { downtimedata } from '../constants/utilizationDowntime';
import ComposedChartExample from '../components/UComposedChart';
import { productionCountData } from '../constants/UProductionCount';
import OEEChart from '../components/UOEEChart';
import { oeeChartData } from '../constants/oeeChartData';
import ChartRendering2 from '../components/DownTimePageChart';
import { downTimePageData } from '../constants/downtimepageData';
import SixBigChart from '../components/SixBigChart';
import { sixBigChartData } from '../constants/sixbigchartdata';
import CycleTimeChart from '../components/CycleTimeChart';
import CycleTimeChartModified from '../components/CycleTimeChartModified';
// import { cycleTimeData } from '../constants/cycleTimeChartData';
import { cycleChartData } from '../constants/cycleChartData';
import CycleTimeExample from '../components/CycleCartExample';
import MouseHoldAndSlide from '../components/Panning';
import SimpleBarChart from '../components/SimpleBarChart';
import { vBarChartData } from '../constants/verticalBarchartData';
import CycleTimeChartModifiedJSX from '../components/CycleTimeChartModifiedJSX';
import RangeChart from '../components/RangeBar';
import RangeChartEx from '../components/RangeExample';
import { apexData } from '../constants/apexData';
import ParameterChart from '../components/ParameterChart';
// import SimpleBar from '../components/SimpleBarChart';
// import { ComposedChart } from 'recharts';


const HomePage = () => {

  const handleSlide = (deltaX) => {
    console.log('Slide distance:', deltaX);
    // Perform any action based on the slide distance
  };

  return (
    <Stack direction={'column'} spacing={20} sx={{ alignItems: 'center' }}>
      <Header></Header>
      <Container>
        <ParameterChart />
        {/* <RangeChartEx chartData={apexData} /> */}
        {/* <RangeChart data={sixBigChartData} chartData={vBarChartData}  />
        <SimpleBarChart chartData={vBarChartData} /> */}
        <CycleTimeChartModifiedJSX chartData={cycleChartData} />
        {/* <div id="chart-container" style={{ width: '100%', height: '500px' }}></div> */}
        
        {/* <CycleTimeExample chartData={cycleChartData} elementId={'chartId'}/>   */}
        {/* <MouseHoldAndSlide onSlide={handleSlide}/> */}
        <CycleTimeChartModified chartData={cycleChartData} elementId={'chart-container'} />
        {/* <CycleTimeChart chartData={cycleChartData} elementId={'chartId'}/> */}
        {/* <SixBigChart data={sixBigChartData} /> */}
        {/* <StackedBarChartComponent data={data} /> */}
        {/* <ComposedChartExample data={productionCountData} /> */}
        {/* <UDownTimeChart data={downtimedata} /> */}
        {/* <OEEChart data={oeeChartData} /> */}

        {/* <ChartRendering2 data={downTimePageData}/> */}

        {/* <div className="welcome-text">
          <Typography variant="h4" component="div">
            Welcome to My App
          </Typography>
        </div> */}
        {/* <Stack>
          <GaugeMeter availability={0} performance={3} quality={4} />
        </Stack> */}
        {/* <MachineWiseOEE data={machineOEEData} yTicks={yTicks} startDate={'1/6/2024'} endDate={'13/6/2024'} /> */}
        {/* <DownTimeReport data={downTimeProps} /> */}
        {/* <DownTimeReport2 /> */}
        {/* <ChartRendering
          renderData={chartData}
          width={chartWidth}
          height={chartHeight}
          plugins={usePlugins}
        /> */}
      </Container>
    </Stack>
  );
}

export default HomePage;
