import { Box } from '@chakra-ui/react';
import * as React from 'react';
import { Bar, ComposedChart, Label, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DailyStats } from 'types/statistics';

const Chart = ({ yLabel, data }: { yLabel: string; data: { counter: number | undefined ; stats: DailyStats[] | undefined } }) => {
	return (
		<Box p="8px" background="gray.900" mt="4" rounded="md" shadow="md" width="100%">
			<ResponsiveContainer width="100%" height={400}>
				<ComposedChart width={800} height={400} data={data.stats ?? []}>
					<Bar dataKey="count" stroke="#8884d8" barSize={20} fill="#413ea0" />
					<Line type="monotone" dataKey="toDate" stroke="#8884d8" />
					<XAxis dataKey="date">
						<Label value="Date" offset={-5} position="insideBottom" />
					</XAxis>
					<YAxis>
						<Label value={yLabel} angle={-90} position="insideLeft" />
					</YAxis>
					<Tooltip />
				</ComposedChart>
			</ResponsiveContainer>
		</Box>
	)
}

export default Chart;