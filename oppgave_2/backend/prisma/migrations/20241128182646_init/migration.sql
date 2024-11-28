-- CreateTable
CREATE TABLE "Registration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "event_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Registration_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "template_id" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "datetime" DATETIME NOT NULL,
    "location" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL,
    "waitinglist" BOOLEAN NOT NULL,
    CONSTRAINT "Event_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "Template" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Template" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weekdays" TEXT NOT NULL,
    "notSameDay" BOOLEAN NOT NULL,
    "private" BOOLEAN NOT NULL,
    "lim_attend" BOOLEAN NOT NULL,
    "fixed_price" BOOLEAN NOT NULL,
    "free" BOOLEAN NOT NULL,
    "waitinglist" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE INDEX "Registration_event_id_idx" ON "Registration"("event_id");

-- CreateIndex
CREATE INDEX "Event_template_id_idx" ON "Event"("template_id");
