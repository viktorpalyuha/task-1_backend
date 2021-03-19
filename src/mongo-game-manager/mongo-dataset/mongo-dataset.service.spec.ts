
    service = module.get<MongoDatasetService>(MongoDatasetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
