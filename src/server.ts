import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from './swagger.json'
import {promises as fs} from "fs";
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument));

interface Shift{
    id: string;
    workplaceId: string;
    start: string;
    end: string;
}


function isWithinDataRange(dataStr: string,start:string,end:string): boolean {
    const d = new Date(dataStr);
    return d>=new Date(start) && d<=new Date(end);
}

app.get("/workplaces",async (req,res)=>{
    const { startDate, endDate } = req.query;
    if(!startDate || !endDate){
        return res.status(400).send("Please enter a valid start! or end!");
    }
    const data = await fs.readFile("src/mockShifts.json", "utf8");
    const shifts: Shift[] = JSON.parse(data);
    const filtered=shifts.filter((shift)=>
        isWithinDataRange(shift.start,startDate as string,endDate as string));
    const countByWorkplaceId:Record<string, number> = {};
    for(const shift of filtered){
        const id = shift.workplaceId;
        countByWorkplaceId[id]=(countByWorkplaceId[id]||0)+1;
    }
    const sorted = Object.entries(countByWorkplaceId)
        .map(([workplaceId,count])=>({workplaceId,count}))
        .sort((a,b)=>b.count - a.count);
    res.json(sorted);
});

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
    console.log(`Swagger docs at http://localhost:${port}/api-docs`);
});