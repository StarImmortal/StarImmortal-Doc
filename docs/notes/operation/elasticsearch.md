---
title: ElasticSearch
---

# ElasticSearch 入门

## 安装
  * [下载地址](https://www.elastic.co/cn/downloads/elasticsearch)

  * ES可视化插件
      ```
      Chrome商店搜索：ElasticSearch Head 安装即可
      ``` 

## kibana安装
   * [下载地址](https://www.elastic.co/cn/downloads/kibana)

   * 配置中文
        ```
        修改config文件夹下的kibana.yml文件

        i18n.locale: "zh-CN"
        ``` 
## IK分词器安装
  * [下载地址](https://github.com/medcl/elasticsearch-analysis-ik/releases)
  * 自定义词典
      ```

      ``` 
  * 用法
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

## Rest风格操作
  * 创建文档（指定文档id）
    - PUT localhost:9200/索引名称/类型名称/文档id
  * 创建文档（随机文档id）
    - POST localhost:9200/索引名称/类型名称
  * 修改文档 
    - POST localhost:9200/索引名称/_update/文档id
      ```json
      POST /索引名称/_update/文档id
      {
      "doc": {
          "name": "william111"
        }
      }
      ``` 
  * 删除文档（随机文档id）
    - POST localhost:9200/索引名称/类型名称/文档id
  * 条件查询
      ```json
      GET localhost:9200/索引名称/_search
      {
        "query": {
          "match": {
            "name": "william"
          }
        },
        "_source": "{field}",   
        "sort": [
          {
            "FIELD": {
              "order": "desc"
            }
          }
        ],
        "from": 0,
        "size": 20
      }
      ``` 
## 拓展命令
  ```bash
  GET _cat/health
  GET _cat/indices/?v
  ```

<RightMenu />