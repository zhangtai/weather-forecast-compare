import { Link, useLoaderData } from '@remix-run/react'
import {
	File,
	Home,
	LineChartIcon,
	ListFilter,
	Package,
	Package2,
	PanelLeft,
	PlusCircle,
	Search,
	ShoppingCart,
	Users2,
} from 'lucide-react'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '#app/components/ui/breadcrumb'
import { Button } from '#app/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '#app/components/ui/card'
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '#app/components/ui/chart'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '#app/components/ui/dropdown-menu'
import { Input } from '#app/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '#app/components/ui/sheet'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '#app/components/ui/tabs'
import { json } from '@remix-run/node'
import {
	ComposedChart,
	CartesianGrid,
	Line,
	LineChart,
	XAxis,
	Bar,
} from 'recharts'

export const loader = async () => {
	const res = await fetch(
		'https://api.open-meteo.com/v1/forecast?latitude=46.3162,23.1167&longitude=129.5546,113.25&hourly=temperature_2m&timezone=Asia/Singapore',
	)
	return json(await res.json())
}

export default function App() {
	const weatherData = useLoaderData<typeof loader>()
	// console.log(weatherData[0].hourly.time);
	const chartData = weatherData[0].hourly.time.map((hour, index) => {
		return {
			ts: hour,
			yilan: weatherData[0].hourly.temperature_2m[index],
			guangzhou: weatherData[1].hourly.temperature_2m[index],
			diff:
				weatherData[1].hourly.temperature_2m[index] -
				weatherData[0].hourly.temperature_2m[index],
		}
	})

	const chartConfig = {
		yilan: {
			label: 'Yilan',
			color: 'blue',
		},
		guangzhou: {
			label: 'Guangzhou',
			color: 'green',
		},
	} satisfies ChartConfig
	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40">
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
				<header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
					<Sheet>
						<SheetTrigger asChild>
							<Button size="icon" variant="outline" className="sm:hidden">
								<PanelLeft className="h-5 w-5" />
								<span className="sr-only">Toggle Menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="sm:max-w-xs">
							<nav className="grid gap-6 text-lg font-medium">
								<Link
									to="#"
									className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
								>
									<Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
									<span className="sr-only">Acme Inc</span>
								</Link>
								<Link
									to="#"
									className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
								>
									<Home className="h-5 w-5" />
									Dashboard
								</Link>
								<Link
									to="#"
									className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
								>
									<ShoppingCart className="h-5 w-5" />
									Orders
								</Link>
								<Link
									to="#"
									className="flex items-center gap-4 px-2.5 text-foreground"
								>
									<Package className="h-5 w-5" />
									Products
								</Link>
								<Link
									to="#"
									className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
								>
									<Users2 className="h-5 w-5" />
									Customers
								</Link>
								<Link
									to="#"
									className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
								>
									<LineChartIcon className="h-5 w-5" />
									Settings
								</Link>
							</nav>
						</SheetContent>
					</Sheet>
					<Breadcrumb className="hidden md:flex">
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link to="#">Dashboard</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link to="#">Products</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>All Products</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
					<div className="relative ml-auto flex-1 md:grow-0">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search..."
							className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
						/>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="overflow-hidden rounded-full"
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
				<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
					<Tabs defaultValue="all">
						<div className="flex items-center">
							<TabsList>
								<TabsTrigger value="all">All</TabsTrigger>
								<TabsTrigger value="active">Active</TabsTrigger>
								<TabsTrigger value="draft">Draft</TabsTrigger>
								<TabsTrigger value="archived" className="hidden sm:flex">
									Archived
								</TabsTrigger>
							</TabsList>
							<div className="ml-auto flex items-center gap-2">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline" size="sm" className="h-7 gap-1">
											<ListFilter className="h-3.5 w-3.5" />
											<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
												Filter
											</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>Filter by</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuCheckboxItem checked>
											Active
										</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem>
											Archived
										</DropdownMenuCheckboxItem>
									</DropdownMenuContent>
								</DropdownMenu>
								<Button size="sm" variant="outline" className="h-7 gap-1">
									<File className="h-3.5 w-3.5" />
									<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
										Export
									</span>
								</Button>
								<Button size="sm" className="h-7 gap-1">
									<PlusCircle className="h-3.5 w-3.5" />
									<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
										Add Product
									</span>
								</Button>
							</div>
						</div>
						<TabsContent value="all">
							<Card x-chunk="dashboard-06-chunk-0">
								<CardHeader>
									<CardTitle>Products</CardTitle>
									<CardDescription>
										Manage your products and view their sales performance.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ChartContainer config={chartConfig}>
										<ComposedChart
											accessibilityLayer
											data={chartData}
											margin={{
												left: 12,
												right: 12,
											}}
										>
											{/* <LineChart
											accessibilityLayer
											data={chartData}
											margin={{
												left: 12,
												right: 12,
											}}
										> */}
											<CartesianGrid vertical={false} />
											<XAxis
												dataKey="ts"
												tickLine={false}
												axisLine={false}
												tickMargin={8}
												tickFormatter={(value) => value.slice(0, 3)}
											/>
											<ChartTooltip
												cursor={false}
												content={<ChartTooltipContent />}
											/>
											<Line
												dataKey="yilan"
												type="monotone"
												stroke="var(--color-yilan)"
												strokeWidth={2}
												dot={false}
											/>
											<Line
												dataKey="guangzhou"
												type="monotone"
												stroke="var(--color-guangzhou)"
												strokeWidth={2}
												dot={false}
											/>
											<Bar dataKey="diff" barSize={20} fill="#413ea0" />
											{/* </LineChart> */}
										</ComposedChart>
									</ChartContainer>
								</CardContent>
								<CardFooter>
									<div className="text-xs text-muted-foreground">
										Showing <strong>1-10</strong> of <strong>32</strong>{' '}
										products
									</div>
								</CardFooter>
							</Card>
						</TabsContent>
					</Tabs>
				</main>
			</div>
		</div>
	)
}
