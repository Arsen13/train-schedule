-- CreateTable
CREATE TABLE "TrainRecord" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "trainNumber" INTEGER NOT NULL,
    "railwayNumber" INTEGER NOT NULL,
    "departureStation" TEXT NOT NULL,
    "arrivalStation" TEXT NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrainRecord" ADD CONSTRAINT "TrainRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
