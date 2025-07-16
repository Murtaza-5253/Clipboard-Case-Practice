import axios from "axios";
interface Shift{
    id: string;
    workplaceId: string;
    start: string;
    end: string;
}
const shifts: Shift[] = [
    { id: "1", workplaceId: "A1", start: "2024-06-01", end: "2024-06-01" },
    { id: "2", workplaceId: "B1", start: "2024-06-01", end: "2024-06-01" },
    { id: "3", workplaceId: "A1", start: "2024-06-02", end: "2024-06-02" },
    { id: "4", workplaceId: "C1", start: "2024-06-01", end: "2024-06-01" },
    { id: "5", workplaceId: "A1", start: "2024-06-03", end: "2024-06-03" },
    { id: "6", workplaceId: "B1", start: "2024-06-02", end: "2024-06-02" },
    { id: "7", workplaceId: "C1", start: "2024-06-03", end: "2024-06-03" },
    { id: "8", workplaceId: "B1", start: "2024-06-04", end: "2024-06-04" },
    { id: "9", workplaceId: "A1", start: "2024-06-05", end: "2024-06-05" },
    { id: "10", workplaceId: "A1", start: "2024-06-05", end: "2024-06-05" },
    { id: "11", workplaceId: "B1", start: "2024-06-06", end: "2024-06-06" },
    { id: "12", workplaceId: "C1", start: "2024-06-03", end: "2024-06-03" },
    { id: "13", workplaceId: "C1", start: "2024-06-03", end: "2024-06-03" },
    { id: "14", workplaceId: "C1", start: "2024-06-03", end: "2024-06-03" },
    { id: "15", workplaceId: "C1", start: "2024-06-03", end: "2024-06-03" }
];

function isWithinDataRange(dataStr: string,start:string,end:string): boolean {
    const d = new Date(dataStr);
    return d>=new Date(start) && d<=new Date(end);
}

async function getMostActiveWorkplaces(startDate:string,endDate:string){
    const filtered=shifts.filter((shift)=>
    isWithinDataRange(shift.start,startDate,endDate));
    const countByWorkplaceId:Record<string, number> = {};
    for(const shift of filtered){
        const id = shift.workplaceId;
        countByWorkplaceId[id]=(countByWorkplaceId[id]||0)+1;
    }
    const sorted = Object.entries(countByWorkplaceId)
        .map(([workplaceId,count])=>({workplaceId,count}))
        .sort((a,b)=>b.count - a.count);
    console.log(`\n🔥 Top Active Workplaces between ${startDate} and ${endDate}:`);
    for(const entry of sorted){
        console.log(`Workplace ${entry.workplaceId}: ${entry.count} shifts`);
    }
}

const [,,start,end]=process.argv;
if(!start || !end){
    console.error("❌ Please provide start and end dates like: npm run workplaces 2024-06-01 2024-06-06");
    process.exit(1);
}

getMostActiveWorkplaces(start,end);



// async function fetchData(){
//     const res = await axios.get<Shift[]>('https://mocki.io/v1/b043df5a-43cf-4dc1-99d6-c75625f2b3f3');
//     console.log(res.data.length);
// }
// fetchData();