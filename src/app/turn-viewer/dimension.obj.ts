export class Dimension {
	
	from: number;
	to: number;
	size: Size;
	
	constructor(from: number, to: number, size: Size) {
		this.from = from;
		this.to = to;
		this.size= size;
	}
}

export class BookRange {
	
	defaultSize: Size = new Size(440, 620);
	dimensions: Dimension[] = [];
	
	constructor() {
		this.dimensions.push(new Dimension(1900, 1905, new Size(880, 620)));
		this.dimensions.push(new Dimension(1906, 1906, new Size(880, 580)));
		this.dimensions.push(new Dimension(1907, 1912, new Size(880, 620)));
		this.dimensions.push(new Dimension(1913, 1914, new Size(880, 580)));
		this.dimensions.push(new Dimension(1915, 1934, new Size(880, 620)));
		this.dimensions.push(new Dimension(1935, 1949, new Size(880, 580)));
		this.dimensions.push(new Dimension(1950, 1955, new Size(880, 590)));
		this.dimensions.push(new Dimension(1956, 1957, new Size(880, 560)));
		this.dimensions.push(new Dimension(1958, 1960, new Size(880, 580)));
		this.dimensions.push(new Dimension(1961, 2004, new Size(880, 580)));
		this.dimensions.push(new Dimension(2005, 2013, new Size(780, 580)));
		this.dimensions.push(new Dimension(2014, 2020, new Size(780, 550)));
	}
	
	findSize(year: number): Size {
		var found = this.dimensions.find(dim => year >= dim.from && year <= dim.to);
		return found ? found.size : this.defaultSize;
	}
}

export class Size {
	
	width: number;
	height: number;
	
	constructor(width: number, height: number) {
		this.width = width;
		this.height = height;
	}
}