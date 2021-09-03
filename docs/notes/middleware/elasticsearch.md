---
title: ElasticSearch
---

# ElasticSearch

## 介绍

Elaticsearch，简称为`ES`，`ES`是一个开源的高扩展的分布式全文搜索引擎，是整个`ElasticStack`技术栈的核心。它可以近乎实时的存储、检索数据；本身扩展性很好，可以扩展到上百台服务器，处理`PB`级别的数据。

## 安装

- [下载地址](https://www.elastic.co/cn/downloads/elasticsearch)

- 解压

![目录结构](https://z3.ax1x.com/2021/09/01/h0iEX6.png)

| bin     | 可执行脚本目录 |
| ------- | -------------- |
| config  | 配置目录       |
| jdk     | 内置 JDK 目录  |
| lib     | 类库           |
| logs    | 日志目录       |
| modules | 模块目录       |
| plugins | 插件目录       |

- 进入`bin`文件目录，点击`elasticsearch.bat`文件启动`ES`服务

![启动界面](https://z3.ax1x.com/2021/09/01/h0kRp9.png)

:::tip
注意：`9300`端口为`ElasticSearch`集群间组件的通信端口，`9200`端口为浏览器访问的`http`协议`RESTful`端口
:::

- 打开浏览器（推荐使用谷歌浏览器），输入地址：`http://localhost:9200`，测试结果

![启动成功](https://z3.ax1x.com/2021/09/01/h0AAcn.png)

- [ES可视化插件](https://github.com/mobz/elasticsearch-head)

1. Running with built in server

```bash
git clone git://github.com/mobz/elasticsearch-head.git
cd elasticsearch-head
npm install
npm run start
open http://localhost:9200/
```
This will start a local webserver running on port 9200 serving elasticsearch-head

2. Running as a Chrome extension

Install [ElasticSearch Head](https://chrome.google.com/webstore/detail/elasticsearch-head/ffmkiejjmecolpfloofpjologoblkegm/) from the Chrome Web Store.

Click the extension icon in the toolbar of your web browser.

Note that you don’t need to [enable CORS](https://github.com/mobz/elasticsearch-head#enable-cors-in-elasticsearch) with this method.

## kibana安装

- [下载地址](https://www.elastic.co/cn/downloads/kibana)

- 配置中文

  ```
  修改config文件夹下的kibana.yml文件
  
  i18n.locale: "zh-CN"
  ```

## IK分词器安装

- [下载地址](https://github.com/medcl/elasticsearch-analysis-ik/releases)
- 自定义词典
- 用法
  - ik_smart 
    ```json
    GET _analyze
    {
      "analyzer": "ik_smart",
      "text": "中国共产党"
    }
    ```
  - ik_max_word
    ```json
    GET _analyze
    {
      "analyzer": "ik_max_word",
      "text": "中国共产党"
    }
    ```

## 数据格式

ElasticSearch里存储文档数据和关系型数据库`MySQL`存储数据的概念进行一个类比：

![数据格式](https://z3.ax1x.com/2021/09/01/h0ARUS.jpg)

:::tip
ElasticSearch里的`Index`可以看做一个库，而`Types`相当于表，`Documents`则相当于表的行。这里`Types`的概念已经被逐渐弱化，`Elasticsearch 6.X`中，一个`index`下已经只能包含一个`type`，`Elasticsearch 7.X`中，`Type`的概念已经被删除了。
:::

## RESTful风格

:::tip
`REST`指的是一组架构约束条件和原则。满足这些约束条件和原则的应用程序或设计就是`RESTfu`。`Web`应用程序最重要的`REST`原则是，客户端和服务器之间的交互在请求之间是无状态的。从客户端到服务器的每个请求都必须包含理解请求所必需的信息。如果服务器在请求之间的任何时间点重启，客户端不会得到通知。此外，无状态请求可以由任何可用服务器回答，这十分适合云计算之类的环境。客户端可以缓存数据以改进性能。在服务器端，应用程序状态和功能可以分为各种资源。资源是一个有趣的概念实体，它向客户端公开。资源的例子有：应用程序对象、数据库记录、算法等等。每个资源都使用`URI(Universal Resource Identifier)`得到一个唯一的地址。所有资源都共享统一的接口，以便在客户端和服务器之间传输状态。使用的是标准的`HTTP`方法，比如`GET`、`PUT`、`POST`和`DELETE`。在`REST`样式的`Web`服务中，每个资源都有一个地址。资源本身都是方法调用的目标，方法列表对所有资源都是一样的。这些方法都是标准方法，包括`GET`、`POST`、`PUT`、`DELETE`，还可能包括`HEAD`和 `OPTIONS`。简单的理解就是，如果想要访问互联网上的资源，就必须向资源所在的服务器发出请求，请求体中必须包含资源的网络路径， 以及对资源进行的操作(增删改查)。
:::

## 索引操作

### 创建索引

对比关系型数据库，创建索引就等同于创建数据库

在`Postman`中，向`ES`服务器发`PUT`请求：`http://127.0.0.1:9200/${索引名称}`

![创建索引](https://z3.ax1x.com/2021/09/01/h0MRUI.png)

服务器响应结果如下：

```json
{
    "acknowledged": true,
    "shards_acknowledged": true,
    "index": "shopping"
}
```

:::tip
acknowledged：响应结果

shards_acknowledged：分片结果

index：索引名称
:::

### 查看单个索引

在`Postman`中，向`ES`服务器发`GET`请求：`http://127.0.0.1:9200/${索引名称}`

![查看单个索引](https://z3.ax1x.com/2021/09/01/h08Nhn.png)

服务器响应结果如下：

```json
{
    "shopping": {
        "aliases": {},
        "mappings": {},
        "settings": {
            "index": {
                "creation_date": "1630481607170",
                "number_of_shards": "1",
                "number_of_replicas": "1",
                "uuid": "fgT9N4XeReGtjRRV5BmDBw",
                "version": {
                    "created": "7080099"
                },
                "provided_name": "shopping"
            }
        }
    }
}
```

| 字段               | 含义                     |
| ------------------ | ------------------------ |
| shopping           | 索引名                   |
| aliases            | 映射                     |
| mappings           | 设置                     |
| settings           | 设置                     |
| index              | 设置 - 索引              |
| creation_date      | 设置 - 索引 - 创建时间   |
| number_of_shards   | 设置 - 索引 - 主分片数量 |
| number_of_replicas | 设置 - 索引 - 副分片数量 |
| uuid               | 设置 - 索引 - 唯一标识   |
| version            | 设置 - 索引 - 版本       |
| provided_name      | 设置 - 索引 - 名称       |

### 查看所有索引

在`Postman`中，向`ES`服务器发`GET`请求：`http://127.0.0.1:9200/_cat/indices?v`

![查看所有索引](https://z3.ax1x.com/2021/09/01/h0li6S.png)

![响应结果](https://z3.ax1x.com/2021/09/01/h0lO3V.png)

| 表头           | 含义                                                         |
| -------------- | ------------------------------------------------------------ |
| health         | 当前服务器健康状态： green(集群完整)；yellow(单点正常、集群不完整)；red(单点不正常) |
| status         | 索引打开、关闭状态                                           |
| index          | 索引名                                                       |
| uuid           | 索引统一编号                                                 |
| pri            | 主分片数量                                                   |
| rep            | 副本数量                                                     |
| docs.count     | 可用文档数量                                                 |
| docs.deleted   | 文档删除状态（逻辑删除）                                     |
| store.size     | 主分片和副分片整体占空间大小                                 |
| pri.store.size | 主分片占空间大小                                             |

### 删除索引

在`Postman`中，向`ES`服务器发`DELETE`请求：`http://127.0.0.1:9200/${索引名称}`

![删除索引](https://z3.ax1x.com/2021/09/01/h03kIs.png)

服务器响应结果如下：

```json
{
    "acknowledged": true
}
```

## 文档操作

### 创建文档（随机文档id）

在`Postman`中，向`ES`服务器发`POST`请求：`http://127.0.0.1:9200/${索引名称}`

```json
{
    "title": "小米手机",
    "category": "小米",
    "images": "http://www.gulixueyuan.com/xm.jpg",
    "price": 3999.00
}
```

![创建文档](https://z3.ax1x.com/2021/09/01/h0Yd1I.png)

服务器响应结果如下：

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "p7VToHsB2tE5D-SOHCul",
    "_version": 1,
    "result": "created",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 0,
    "_primary_term": 1
}
```

| 字段       | 含义        |
| ---------- | ----------- |
| _index     | 索引        |
| _type      | 类型-文档   |
| _id        | 唯一标识    |
| _version   | 版本        |
| result     | 结果        |
| _shards    | 分片        |
| total      | 分片 - 总数 |
| successful | 分片 - 成功 |
| failed     | 分片 - 失败 |

上面的数据创建后，由于没有指定数据唯一性标识（ID），默认情况下， `ES`服务器会随机生成一个。

如果想要自定义唯一性标识，需要在创建时指定：`http://127.0.0.1:9200/${索引名称}/_doc/${唯一性标识}`

![指定唯一标识](https://z3.ax1x.com/2021/09/01/h0U3n0.png)

:::tip
注意：如果增加数据时明确数据主键，那么请求方式也可以为`PUT`
:::

### 查看文档（主键查询）

查看文档时，需要指明文档的唯一性标识，类似于`MySQL`中数据的主键查询

在`Postman`中，向`ES`服务器发`GET`请求：`http://127.0.0.1:9200/${索引名称}/_doc`

![查看文档](https://z3.ax1x.com/2021/09/01/h0aeDx.png)

服务器响应结果如下：

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1001",
    "_version": 1,
    "_seq_no": 1,
    "_primary_term": 1,
    "found": true,
    "_source": {
        "title": "小米手机",
        "category": "小米",
        "images": "http://www.gulixueyuan.com/xm.jpg",
        "price": 3999.00
    }
}
```

### 修改文档（全局）

在`Postman`中，向`ES`服务器发`PUT`请求：`http://127.0.0.1:9200/${索引名称}/_doc/${唯一标识}`

![修改文档（全局）](https://z3.ax1x.com/2021/09/01/h0wYAf.png)

服务器响应结果如下：

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1001",
    "_version": 2,
    "result": "updated",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 2,
    "_primary_term": 1
}
```

### 修改文档（局部）

在`Postman`中，向`ES`服务器发`POST`请求：`http://127.0.0.1:9200/${索引名称}/_update/${唯一标识}`

![修改文档（局部）](https://z3.ax1x.com/2021/09/01/h00k8g.png)

服务器响应结果如下：

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "1001",
    "_version": 3,
    "result": "updated",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 3,
    "_primary_term": 1
}
```

### 删除文档

在`Postman`中，向`ES`服务器发`DEKETE`请求：`http://127.0.0.1:9200/${索引名称}/_doc_/${唯一标识}`

![删除文档](https://z3.ax1x.com/2021/09/01/h0smSU.png)

服务器响应结果如下：

```json
{
    "_index": "shopping",
    "_type": "_doc",
    "_id": "p7VToHsB2tE5D-SOHCul",
    "_version": 2,
    "result": "deleted",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 4,
    "_primary_term": 1
}
```

## 查询操作

### 全量查询

match_all(代表查询所有)：`match`，`term`，`range`等等

在`Postman`中，向`ES`服务器发`GET`请求：`http://127.0.0.1:9200/${索引名称}/_search`

```json
{
    "query": {
        "match_all": {}
    }
}
```

![查询所有文档](https://z3.ax1x.com/2021/09/01/hBS0kd.png)

服务器响应结果如下：

```json
{
    "took": 1,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 1,
            "relation": "eq"
        },
        "max_score": 1.0,
        "hits": [
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "1001",
                "_score": 1.0,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/hw.jpg",
                    "price": 4999.0
                }
            }
        ]
    }
}
```

| 字段       | 含义                                                |
| ---------- | --------------------------------------------------- |
| took       | 查询花费时间：单位毫秒                              |
| timed_out  | 是否超时                                            |
| _shards    | 分片信息                                            |
| total      | 总数                                                |
| successful | 成功                                                |
| skipped    | 忽略                                                |
| failed     | 失败                                                |
| hits       | 搜索命中结果                                        |
| total      | 搜索条件匹配的文档总数                              |
| value      | 总命中计数的值                                      |
| relation   | 计数规则：eq（表示计数准确）；gte（表示计数不准确） |
| max_score  | 匹配度分值                                          |
| hits       | 命中结果集合                                        |

### 匹配查询（全文检索）

`match`匹配类型查询，会把查询条件进行分词，然后进行查询，多个词条之间是`or`的关系

在`Postman`中，向`ES`服务器发`GET`请求：`http://127.0.0.1:9200/${索引名称}/_search`

```json
{
    "query": {
        "match": {
            "category": "华为"
        }
    }
}
```

![匹配查询（全文检索）](https://z3.ax1x.com/2021/09/01/hBCSOK.png)

服务器响应结果如下：

```json
{
    "took": 2,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 1,
            "relation": "eq"
        },
        "max_score": 0.36464313,
        "hits": [
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "1001",
                "_score": 0.36464313,
                "_source": {
                    "title": "华为手机",
                    "category": "华为",
                    "images": "http://www.gulixueyuan.com/hw.jpg",
                    "price": 4999.0
                }
            }
        ]
    }
}
```

### 匹配查询（完全匹配）

在`Postman`中，向`ES`服务器发`GET`请求：`http://127.0.0.1:9200/${索引名称}/_search`

```json
{
    "query": {
        "match_phrase": {
            "category": "华为"
        }
    }
}
```

![匹配查询（完全匹配）](https://z3.ax1x.com/2021/09/01/hBuP7n.png)

### 分页查询

from：当前页的起始索引，默认从`0`开始

size：每页显示多少条

:::tip
from = (pageNum - 1) * size
:::

在`Postman`中，向`ES`服务器发`GET`请求：`http://127.0.0.1:9200/${索引名称}/_search`

```json
{
    "query": {
        "match_all": {}
    },
    "from": 0,
    "size": 2
}
```

![分页查询](https://z3.ax1x.com/2021/09/01/hBFCwT.png)

### 指定查询字段

默认情况下，Elasticsearch在搜索的结果中，会把文档中保存在`_source`的所有字段都返回。

如果只想获取其中的部分字段，可以添加`_source`进行过滤

在`Postman`中，向`ES`服务器发`GET`请求：`http://127.0.0.1:9200/${索引名称}/_search`

```json
{
    "query": {
        "match_all": {}
    },
    "_source": [
        "title"
    ]
}
```

![指定查询字段](https://z3.ax1x.com/2021/09/01/hBkugs.png)

### 过滤字段

includes：指定想要显示的字段

excludes：指定不想要显示的字段

在`Postman`中，向`ES`服务器发`GET`请求：`http://127.0.0.1:9200/${索引名称}/_search`

```json
{
    "query": {
        "match_all": {}
    },
    "_source": {
        "includes": [
            "title",
            "category"
        ],
        "excludes": []
    }
}
```

### 单字段排序

`sort`可以按照不同的字段进行排序，并且通过`order`指定排序的方式。`desc`降序，`asc`升序。

在`Postman`中，向`ES`服务器发`GET`请求：`http://127.0.0.1:9200/${索引名称}/_search`

```json
{
    "query": {
        "match_all": {}
    },
    "sort": {
        "price": {
            "order": "desc"
        }
    }
}
```

![单字段排序](https://z3.ax1x.com/2021/09/01/hBk1bV.png)

### 多字段排序

在`Postman`中，向`ES`服务器发`GET`请求：`http://127.0.0.1:9200/${索引名称}/_search`

```json
{
    "query": {
        "match_all": {}
    },
    "sort": [
        {
            "price": {
                "order": "desc"
            }
        },
        {
            "id": {
                "order": "desc"
            }
        }
    ]
}
```

### 组合查询

`bool`把各种其它查询通过`must`、`must_not`、`should`的方式进行组合

在`Postman`中，向`ES`服务器发`GET`请求：`http://127.0.0.1:9200/${索引名称}/_search`

```json
{
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "category": "小米"
                    }
                },
                {
                    "match": {
                        "price": 4999.00
                    }
                }
            ],
            "must_not": [
                {
                    "match": {
                        "price": "2000"
                    }
                }
            ],
            "should": [
                {
                    "match": {
                        "category": "小米"
                    }
                }
            ]
        }
    }
}
```

### 范围查询

`range`查询找出落在指定区间内的数字或者时间

`range`查询允许以下字符：

| 操作符 | 说明       |
| ------ | ---------- |
| gt     | 大于>      |
| gte    | 大于等于>= |
| lt     | 小于<      |
| lte    | 小于等于<= |

在`Postman`中，向`ES`服务器发`GET`请求：`http://127.0.0.1:9200/${索引名称}/_search`

```json
{
    "query": {
        "range": {
            "price": {
                "gte": 3000,
                "lte": 5000
            }
        }
    }
}
```

![范围查询](https://z3.ax1x.com/2021/09/01/hBuKB9.png)

### 高亮查询

在进行关键字搜索时，搜索出的内容中的关键字会显示不同的颜色，称之为高亮

Elasticsearch可以对查询内容中的关键字部分，进行标签和样式（高亮）的设置

在使用`match`查询的同时，加上一个`highlight`属性：

| 属性      | 含义                                                         |
| --------- | ------------------------------------------------------------ |
| pre_tags  | 前置标签                                                     |
| post_tags | 后置标签                                                     |
| fields    | 需要高亮的字段                                               |
| title     | 这里声明`title`字段需要高亮，后面可以为这个字段设置特有配置，也可以空 |

在`Postman`中，向`ES`服务器发`GET`请求：`http://127.0.0.1:9200/${索引名称}/_search`

```json
{
    "query": {
        "match_phrase": {
            "category": "小米"
        }
    },
    "highlight": {
        "fields": {
            "category": {}
        }
    }
}
```

![高亮查询](https://z3.ax1x.com/2021/09/01/hBdhV0.png)

服务器响应结果如下：

```json
{
    "took": 4,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 1,
            "relation": "eq"
        },
        "max_score": 1.3862942,
        "hits": [
            {
                "_index": "shopping",
                "_type": "_doc",
                "_id": "1002",
                "_score": 1.3862942,
                "_source": {
                    "title": "小米手机",
                    "category": "小米",
                    "images": "http://www.gulixueyuan.com/xm.jpg",
                    "price": 4999.00
                },
                "highlight": {
                    "category": [
                        "<em>小</em><em>米</em>"
                    ]
                }
            }
        ]
    }
}
```

### 聚合查询

聚合允许使用者对`ES`文档进行统计分析，类似与关系型数据库中的`group by`，当然还有很多其他的聚合，例如取最大值、平均值等等。

在`Postman`中，向`ES`服务器发`GET`请求：`http://127.0.0.1:9200/${索引名称}/_search`

1. 分组统计查询

```json
{
    "aggs": {
        "price_group": {
            "terms": {
                "field": "price"
            }
        }
    },
    "size": 0
}
```

2. 最大值

```json
{
    "aggs": {
        "price_max": {
            "max": {
                "field": "price"
            }
        }
    },
    "size": 0
}
```

3. 最小值

```json
{
    "aggs": {
        "price_min": {
            "min": {
                "field": "price"
            }
        }
    },
    "size": 0
}
```

4. 平均值

```json
{
    "aggs": {
        "price_avg": {
            "avg": {
                "field": "price"
            }
        }
    },
    "size": 0
}
```

5. 求和

```json
{
    "aggs": {
        "price_sum": {
            "sum": {
                "field": "price"
            }
        }
    },
    "size": 0
}
```

6. 去重

```json
{
    "aggs": {
        "price_distinct": {
            "cardinality": {
                "field": "age"
            }
        }
    },
    "size": 0
}
```

7. State聚合

`stats`聚合，对某个字段一次性返回`count`，`max`，`min`，`avg`和`sum`五个指标

在`Postman`中，向`ES`服务器发`GET`请求：`http://127.0.0.1:9200/${索引名称}/_search`

```json
{
    "aggs": {
        "price_stats": {
            "stats": {
                "field": "price"
            }
        }
    },
    "size": 0
}
```

服务器响应结果如下：

```json
{
    "took": 3,
    "timed_out": false,
    "_shards": {
        "total": 1,
        "successful": 1,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 2,
            "relation": "eq"
        },
        "max_score": null,
        "hits": []
    },
    "aggregations": {
        "price_stats": {
            "count": 2,
            "min": 4999.0,
            "max": 4999.0,
            "avg": 4999.0,
            "sum": 9998.0
        }
    }
}
```

## 映射操作

有了索引库，等于有了数据库中的`database`。接下来就需要建索引库`index`中的映射了，类似于数据库`database`中的表结构`table`。创建数据库表需要设置字段名称，类型，长度，约束等；索引库也一样，需要知道这个类型下有哪些字段，每个字段有哪些约束信息，这就叫做映射`mapping`。

### 创建映射

在`Postman`中，向`ES`服务器发`PUT`请求：`http://127.0.0.1:9200/${索引名称}/_mapping`

![创建映射](https://z3.ax1x.com/2021/09/01/hBsyGV.png)

```json
{
    "properties": {
        "name": {
            "type": "text",
            "index": true
        },
        "sex": {
            "type": "keyword",
            "index": true
        },
        "mobile": {
            "type": "keyword",
            "index": false
        }
    }
}
```

服务器响应结果如下：

```json
{
    "acknowledged": true
}
```

### 查看映射

在`Postman`中，向`ES`服务器发`GET`请求：`http://127.0.0.1:9200/${索引名称}/_mapping`

![查看映射](https://z3.ax1x.com/2021/09/01/hBrf4P.png)

服务器响应结果如下：

```json
{
    "user": {
        "mappings": {
            "properties": {
                "mobile": {
                    "type": "keyword",
                    "index": false
                },
                "name": {
                    "type": "text"
                },
                "sex": {
                    "type": "keyword"
                }
            }
        }
    }
}
```

## 拓展命令

```bash
GET _cat/health
GET _cat/indices/?v
```

<RightMenu />