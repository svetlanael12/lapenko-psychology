import { NextResponse } from "next/server";

import Paper from "@/lib/models/Paper";

import dbConnect from "../../../lib/mongodb";

export async function GET() {
  await dbConnect();
  const papers = await Paper.find({});

  const json = papers
    .map((paper) => {
      return {
        id: paper.id,
        title: paper.title,
        description: paper.description,
      };
    })
    .reverse();
  return NextResponse.json(json);
}

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  console.log({ body });
  const paper = new Paper(body);
  await paper.save();

  return NextResponse.json(paper, { status: 201 });
}
