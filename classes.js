
class Search {
  static create(type) {
    let algorithm;

    switch (type) {
      case 'linear':
        algorithm = new LinearSearch(this.algorithmData);
        break;
      case 'binary':
        algorithm = new BinarySearch(this.algorithmData);
        break;
      case 'jump':
        algorithm = new JumpSearch(this.algorithmData);
        break;
      case 'interpolation':
        algorithm = new InterpolationSearch(this.algorithmData);
        break;
    }
    return algorithm;
  }
}

class LinearSearch extends Algorithm {
  constructor() {
    super();
  }

  search(target) {
    let regEx = new RegExp(target, 'gmi');
    for (let i = 0; i < this.data.length; i++) {
      if (regEx.test(this.data[i].make_display)) {
        return this.data[i];
      }
    }
    return 'No target found';
  }
}

class BinarySearch extends Algorithm {
  constructor() {
    super();
  }

  search(target) {
    let low = 0;
    let high = this.data.length - 1;
    let lowerCaseTarget = target.toLowerCase();
    while (low <= high) {
      const mid = Math.floor(low + high);
      const element = this.data[mid].make_display.toLowerCase();
      if (element < lowerCaseTarget) {
        low = mid + 1;
      } else if (element > lowerCaseTarget) {
        high = mid - 1;
      } else {
        return this.data[mid];
      }
    }
    return 'No target found';
  }
}

class JumpSearch extends Algorithm {
  constructor() {
    super();
  }
}

class InterpolationSearch extends Algorithm {
  constructor() {
    super();
  }
}

module.exports.getData = (_, res) => {
  const sortFactory = new Sort();
  let quick = sortFactory.create('quick');
  quick.sort();

  const searchFactory = new Search();
  let binary = searchFactory.create('binary');
  res.status(200).json(binary.search('xedos'));
};
